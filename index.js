const Discord = require('discord.js');
const Distube = require('distube');
const config = require('./config.json');
const client = new Discord.Client({
    intents: 641,
});
client.distube = new Distube.default(client, {
    emitNewSongOnly: false,
    searchSongs: 1,
    searchCooldown: 15
});
const fs = require('fs');

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()

fs.readdir("./commands/", (err, files) => {
    if (err) return console.log("Could not find any commands!");
    const jsFiles = files.filter(f => f.split(".").pop() === "js");
    if (jsFiles.length <= 0) return console.log("Could not find any commands!");
    jsFiles.forEach(file => {
        const cmd = require(`./commands/${file}`);
        console.log(`Loaded ${file}`);
        client.commands.set(cmd.name, cmd);
        if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name));
    })
})

client.on("ready", () => {
    console.log(`Bot is Started`);
    client.user.setActivity("Guess The Song", { type: "PLAYING" });
});

//When Clients send message
client.on('messageCreate', async (message) => {
    const prefix = config.prefix;

    let queue = client.distube.getQueue(message);
    let id = `${message.member.toString()}`;

    if (!queue) {
        //Do Nothing
    }
    else if (queue.playing) {   //Check Answer
        if (!answerCorrect) {
            userAnswer = String(message).replace(/\s/g, "").toLowerCase();
            answer = String(songName).replace(/\s/g, "").toLowerCase();
        }
        if (`${userAnswer}` == `${answer}` && !answerCorrect) {  //Answer Correct
            if (scoreBoard[id] == null) return message.channel.send("** You should join a game **");
            answerCorrect = true;
            clearTimeout(timer);
            scoreBoard[id] += 1;

            let playembed = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle(`Correct!!`)
                .addField("Artist", `${artist}`, true)
                .addField("Song", `${songName}`, true)
            message.reply({ embeds: [playembed] });

            setTimeout(() => {
                if (queue.songs.length <= 1) {
                    stopQueue(queue);
                    queue.stop();
                }
                else {
                    queue.skip()
                }
            }, 6000);
        }
        if (Object.keys(vote).length >= questionInfo.members / 2 && !answerCorrect) { //Skip vote
            answerCorrect = true;
            clearTimeout(timer);
            if (queue.songs.length <= 1) {
                stopQueue(queue);
                return queue.stop();
            }
            message.channel.send("** Skip **");
            return queue.skip();
        }
    }

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(" ");
    const command = args.shift()?.toLowerCase();
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

    if (!cmd) return;
    if (cmd.inVoiceChannel && !message.member.voice.channel) return message.channel.send(`You must be in a voice channel!`);
    if (cmd.joinGame && scoreBoard[id] == null) return message.channel.send("** You should join a game: !join **");
    if (cmd.notPlaying && queue != null) return message.channel.send("** Song is PLAYING **");
    if (cmd.mustNumber && /[^0-9]/gi.test(args[0])) return message.channel.send("** You should enter a number **");

    try {
        cmd.run(client, message, args, questionInfo, vote, scoreBoard);
    } catch (e) {
        console.error(e);
        message.reply(`Error: ${e}`);
    }

});

var artist, songName, userAnswer, answer;
var timer, answerCorrect;
var questionInfo = { time: 15, MAX_LENGTH: 30, count: -1, members: 0 }, scoreBoard = {}, vote = {};

//Events occur
client.distube.on('playSong', (queue, song) => {
    answerCorrect = false;
    queue.pause();
    clearTimeout(timer);
    vote = {};
    questionInfo.count++;

    if (questionInfo.count > questionInfo.MAX_LENGTH) {
        stopQueue(queue);
        return queue.stop();
    }

    let playembed = new Discord.MessageEmbed()
        .setColor("BLURPLE")
        .setTitle(`NEXT SONG`)
        .addField("Question Number", `${questionInfo.count} / ${questionInfo.MAX_LENGTH}`, true)
        .addField("Time Limit", `${questionInfo.time}`, true)
        .setFooter("To vote skip: !skip")
    if (questionInfo.count > 0) {
        queue.textChannel.send({ embeds: [playembed] }).then(() => {
            queue.seek(35);
        });
    }
    else if (questionInfo.count == 0) {
        
    }

    let str = `${song.name}`;
    artist = `${song.uploader.name}`;
    songName = `${song.name}`;
    answer = "";

    const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/gi;
    const english = /[a-z|A-z]/gi;
    const symbol = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/‘’,一]/gi;

    //가수, 제목 나누기
    if (/-/.test(str)) {
        let position = str.indexOf('-');
        while (str[position - 1] != " ") {
            str = str.replace('-', ' ');
            position = str.indexOf('-');
        }
        let words = str.split('-');
        artist = words[0].trim();
        songName = words[1].trim();
    }
    else if (/–/.test(str)) {
        let words = str.split('–');
        artist = words[0].trim();
        songName = words[1].trim();
    }
    else if (/_/.test(str)) {
        let words = str.split('_');
        artist = words[0].trim();
        songName = words[1].trim();
    }
    else if (/"/.test(str)) {
        let words = str.split('_');
        artist = words[0].trim();
        songName = words[1].trim();
    }

    //artist 추출
    if (/- Topic/.test(artist)) {
        artist = artist.replace('- Topic', "");
        artist.trim();
    }
    if (/[\]]/.test(artist)) {
        artist = artist.split(']')[1].trim();
        artist = artist.trim();
    }

    //songName 추출
    if (/Feat./.test(songName)) {
        songName = songName.split('Feat.')[0].trim();
    }
    else if (/feat./.test(songName)) {
        songName = songName.split('feat.')[0].trim();
    }
    else if (/ft/.test(songName)) {
        let position = songName.indexOf('ft');
        if (songName[position - 1] == " ")
            songName = songName.split('ft')[0].trim();
    }

    if (/가사/.test(songName)) {
        songName = songName.replace("가사", "");
    }
    if (korean.test(songName)) {
        if (songName.indexOf(')') != -1) {
            songName = songName.split(')')[0].trim();
            songName = songName.replace(/[^ 1-9가-힣]/gi, "").trim();
            songName = songName.replace(symbol, "");
        }
    }

    if (/[(]/.test(songName)) {
        songName = songName.split('(')[0].trim();
    }
    if (/[\[]/.test(songName)) {
        songName = songName.split('[')[0].trim();
    }
    songName = songName.replace(symbol, "").trim();

    let deadLine = questionInfo.time * 1000 + 2000;
    timer = setTimeout(() => {  //Time up Code
        answerCorrect = true;
        queue.textChannel.send(`>>> ** Times up!!! **`);
        if (queue.songs.length <= 1) {
            stopQueue(queue);
            queue.stop();
        }
        else {
            queue.skip();
        }
    }, deadLine);

    console.log(artist, songName);
});

client.distube.on("addList", (queue, playlist) => {
    console.log(playlist.songs.length);
    if(playlist)
    queue.shuffle();
    queue.textChannel.send(`Playlist Length : ${playlist.songs.length}`);
    questionInfo.time = 60;
    if (playlist.songs.length < 30) {
        questionInfo.MAX_LENGTH = playlist.songs.length;
    }
});

client.distube.on("searchNoResult", (message, query) => message.channel.send(`No result found for ${query}!`));

//Init Queue
function stopQueue(queue) {
    let score = JSON.stringify(scoreBoard)
    score = score.replace(/[{}"]/gi, "");
    score = score.replace(/,/gi, "\n");
    score = score.replace(/:/gi, "  →  ");

    queue.textChannel.send(`** Game End **`);
    const playembed = new Discord.MessageEmbed()
        .setColor("AQUA")
        .setTitle("Final Score")
        .setDescription(`${score}`)
    queue.textChannel.send({ embeds: [playembed] });
    scoreBoard = {}; questionInfo = { time: 15, MAX_LENGTH: 30, count: -1, members: 0 }; vote = {};
}

client.login(process.env.token);
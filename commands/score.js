const Discord = require("discord.js")

module.exports = {
    name: "score",
    description: "Show scoreboard",
    inVoiceChannel: true,
    joinGame: true,
    notPlaying: false,
    mustNumber: false,
    run: async (client, message, args, questionInfo, vote, scoreBoard) => {
        try {
            let score = JSON.stringify(scoreBoard)
            score = score.replace(/[{}"]/gi, "");
            score = score.replace(/,/gi, "\n");
            score = score.replace(/:/gi, "\t→  ");

            const playembed = new Discord.MessageEmbed()
            .setColor("AQUA")
            .setTitle("Score")
            .setDescription(`${score}`)
            message.channel.send({ embeds: [playembed] });
        } catch (e) {
            message.channel.send(`Error: \`${e}\``)
        }
    }
}
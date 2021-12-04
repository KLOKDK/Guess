module.exports = {
    name: "custom",
    description: "Play game with your own playlist: !custom (playlist link)",
    inVoiceChannel: true,
    joinGame: true,
    notPlaying: true,
    mustNumber: false,
    run: async (client, message, args, questionInfo, vote, scoreBoard) => {
        if (!args[0]) {
            return message.channel.send(`** >>> You should enter a playlist link **`);
        }
        try {
            userList = `${args[0]}`;
            if (userList.indexOf("https://youtube.com/playlist?list=") == -1) {
                return;
            }
            client.distube.play(message, "https://www.youtube.com/watch?v=6KBqUK3W0Gg",{skip: true}).then(() => {
                message.channel.send(`>>> ** Ready to play game \nIt starts after 15 seconds **`);
                client.distube.play(message, userList);
            });
        } catch (e) {
            message.channel.send(`Error: \`${e}\``)
        }
    }
}
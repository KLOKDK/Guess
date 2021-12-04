module.exports = {
    name: "play",
    description: "Play a game",
    inVoiceChannel: true,
    joinGame: true,
    notPlaying: true,
    mustNumber: true,
    run: async (client, message, args, questionInfo, vote, scoreBoard) => {
        try {
            message.channel.send(`Playlist ${args} is ready`);
            let List = [
                "PLKPAiC6JBLMPgg_iepkqUM7dO0-7nqCJn",
                "PLKPAiC6JBLMO4alldkfvUfbrAV-TKfml2"];
            userList = "https://youtube.com/playlist?list=" + `${List[(Number(args[0]) - 1)]}`;

            client.distube.play(message, "https://www.youtube.com/watch?v=6KBqUK3W0Gg", { skip: true }).then(() => {
                message.channel.send(`>>> ** Ready to play game \nIt starts after 15 seconds **`);
                message.channel.send(`>>> ** To play: Just Write Song Name! **`)
                client.distube.play(message, userList);
            });
        } catch (e) {
            message.channel.send(`Error: \`${e}\``)
        }
    }
}
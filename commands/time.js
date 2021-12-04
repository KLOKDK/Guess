module.exports = {
    name: "time",
    description: "Set time limit(30 ~ 100)",
    inVoiceChannel: true,
    joinGame: true,
    notPlaying: false,
    mustNumber: true,
    run: async (client, message, args, questionInfo, vote, scoreBoard) => {
        try {
            if (args[0] > 100) {
                questionInfo.time = 100;
                return message.channel.send("** Time Limit: 100(MAX) **");
            }
            if (args[0] < 30) {
                questionInfo.time = 30;
                return message.channel.send("** Time Limit: 30(MIN) **");
            }
            if (args[0] >= 30) {
                questionInfo.time = Number(args[0]);
                return message.channel.send(`** Time limit(Default = 60): ${args[0]} **`);
            }
        } catch (e) {
            message.channel.send(`Error: \`${e}\``)
        }
    }
}
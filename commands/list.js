const Discord = require("discord.js")

module.exports = {
    name: "list",
    description: "Show playlist",
    inVoiceChannel: true,
    joinGame: false,
    notPlaying: false,
    run: async (client, message, args, questionInfo, vote, scoreBoard) => {
        try {
            const playembed = new Discord.MessageEmbed()
            .setColor("GOLD")
            .setTitle("Playlist")
            .setDescription(`** >>> List\n**` +
            `1. 2018 kpop\n` +
            `2. Top 100 Billboard Songs of 2020`)
            .setFooter(`If you want to play Songs: !play\nYour Custom playlist: !custom (playlist url)`)
            message.channel.send({ embeds: [playembed] });
        } catch (e) {
            message.channel.send(`Error: \`${e}\``)
        }
    }
}
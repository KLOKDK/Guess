const Discord = require("discord.js")

module.exports = {
    name: "help",
    description: "Show commands and descriptions",
    run: async (client, message, args, questionInfo, vote, scoreBoard) => {
        const playembed = new Discord.MessageEmbed()
            .setTitle("Commands")
            .setDescription(client.commands.map(cmd => `\`${cmd.name}\`: \`${cmd.description}\``).join("\n"))
            .setTimestamp()
            message.channel.send({ embeds: [playembed] });
    }
}
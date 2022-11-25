const { MessageEmbed } = require('discord.js');
const config = require("../../Configurations/Server_Settings");
const moment = require("moment")

module.exports = {
	config: {
		aliases: ["sponsor"],
		name: "sponsor",
        help: "sponsor [@jahangear/ID]",
		enabled: true
	},

	run: async ({ client, message, args, embed, guild, author }) => {

        if (!message.member.permissions.has(config.Roles.Staff.botCommand)) return message.reply({ content: `Rolun yoxdu ayqa` }).then(message.react(config.Others.Emojis.reject)).sil(10);

		const chewy = await client.users.fetch("920723217956634715");

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(!member) return message.reply({ content: `Keçərli bir ID yazda aa.` }).then(message.react(config.Others.Emojis.reject)).sil(10);

        member.roles.add(config.Roles.Member.Sponsor)
        
        message.reply({ embeds: [new MessageEmbed()
            .setColor("BLACK")
            .setAuthor({name:message.member.displayName , iconURL:message.member.displayAvatarURL()})
            .setFooter({ text: "jahangear 💙", iconURL: chewy.avatarURL({ dynamic: true }) })
            .setDescription(`
${member} adlı üzvə <@${config.Roles.Member.Sponsor}> rolu verildi.
            `)
            ] })
            .then(message.react(config.Others.Emojis.check)).sil(30);

client.channels.cache.get(config.Channels.Log.rolLog).send({ embeds: [embed.setDescription(`
\`Rolu Verilən Üzv:\` ${member} - **${member.id}**
\`Rol Verən Səlahiyyətli:\` ${message.author} - **${message.author.id}**
\`Verilən Rol:\` ${config.Roles.Member.Sponsor}
\`Rol Verilmə Tarixi:\` **${moment(Date.now()).format("LLL")}**
`)] });
}};
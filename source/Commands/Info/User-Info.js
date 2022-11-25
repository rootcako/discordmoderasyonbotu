const { MessageEmbed } = require('discord.js');
const moment = require("moment");
moment.locale("tr");

module.exports = {
	config: {
		aliases: ["user"],
		name: "user",
        help: "user [@jahangear/ID]",
		enabled: true
	},

	run: async ({ client, message, args, embed, guild, author }) => {

		const chewy = await client.users.fetch("920723217956634715");

        let member = message.mentions.users.first() || guild.members.cache.get(args[0]) || author;

        message.reply({ embeds: [new MessageEmbed()
            .setColor("BLACK")
            .setAuthor({name:message.member.displayName , iconURL:message.member.displayAvatarURL()})
            .setFooter({ text: "jahangear 💙", iconURL: chewy.avatarURL({ dynamic: true }) })
            .setDescription(`
・Üzv: ${member} - **${member.id}**

・Serverdə ən yüksək rolu: **${message.member.roles.highest}**
・Serverə Qoşulma Tarixi: **${moment(message.member.joinedAt).format('D MMMM YYYY')}**
`)
            ] })
}}
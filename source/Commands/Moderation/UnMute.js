const { MessageEmbed } = require('discord.js');
const config = require("../../Configurations/Server_Settings");
const db = require("orio.db");
const moment = require("moment");
moment.locale("tr");

module.exports = {
	config: {
		aliases: ["unmute", "susturma-kaldır"],
		name: "unmute",
        help: "unmute [@jahangear/ID]",
		enabled: true
	},

	run: async ({ client, message, args, embed, guild, author }) => {

        if (!message.member.permissions.has(config.Roles.Staff.muteHammer)) return message.reply({ content: `Gerekli olan yetkileri üzerinde taşımıyorsun.` }).then(message.react(config.Others.Emojis.reject)).sil(10);

		const chewy = await client.users.fetch("920723217956634715");

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!member) return message.reply({ content: `Lütfen geçerli bir kullanıcı belirt!`}).then(message.react(config.Others.Emojis.reject)).sil(10);

        if (member.id === author.id) return message.reply({ embeds: [embed.setDescription("Bu komutu kendinde kullanamazsınız.")] }).sil(10);

        let reason = args.splice(1).join(" ")
        if(!reason) return message.reply({ content: `Lütfen geçerli bir sebep belirt!`}).then(message.react(config.Others.Emojis.reject)).sil(10);

        await guild.members.cache.get(member.id).roles.remove(config.Roles.Member.MutedRole);

        message.reply({ embeds: [new MessageEmbed()
            .setColor("BLACK")
            .setAuthor({name:message.member.displayName , iconURL:message.member.displayAvatarURL()})
            .setFooter({ text: "Chewy 💙", iconURL: chewy.avatarURL({ dynamic: true }) })
            .setDescription(`${member} kullanıcısının susturma cezası kaldırıldı!`)]}).then(message.react(config.Others.Emojis.check))

        client.channels.cache.get(config.Channels.Log.muteLog).send({ embeds: [embed.setDescription(`
> ${member} kullanıcısının susturma cezası ${author} tarafından kaldırıldı!

• Kullanıcı: ${member} - ( **${member.id}** )
• Yetkili: ${author} - ( **${author.id}** )
• Sebep: **${reason}**

→ Kaldırılma Tarihi: **${moment(Date.now()).format("LLL")}**
            `)] })

db.set(`mute_${member.id}`, false)
    }
}
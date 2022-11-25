const config = require("../../Configurations/Server_Settings.js");
const { MessageEmbed } = require("discord.js");
const db = require("orio.db");

module.exports = {
    config: {
	aliases: ["sicil-clear", "sicil-temizle"],
	name: "sicil-clear",
	help: "sicil-clear [@jahangear/ID]",
	enabled: true
	},

	run: async ({ client, message, args, embed, guild, author }) => {

        if (!message.member.permissions.has(config.Roles.Staff.botCommand)) return message.reply({ content: `Rolun yoxdu qardaşım get yetkili ol.` }).then(message.react(config.Others.Emojis.reject)).sil(10);

        const chewy = await client.users.fetch("920723217956634715");

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!member) return message.reply({ content: `Zəhmət olmazsa bir üzvü etiketləyin!`}).then(message.react(config.Others.Emojis.reject)).sil(10);

        let sicil = db.delete(`sicil_${member.id}`) || [];

        message.reply({ embeds: [new MessageEmbed()
            .setColor("BLACK")
            .setAuthor({name:message.member.displayName , iconURL:message.member.displayAvatarURL()})
            .setFooter({ text: "jahangear 💙", iconURL: chewy.avatarURL({ dynamic: true }) })
            .setDescription(`${member} adlı üzvün sicil keçmişi təmizləndi!
            `)
        ] 
        }
            )
        }
    }
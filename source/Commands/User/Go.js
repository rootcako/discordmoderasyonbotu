const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const config = require("../../Configurations/Server_Settings");

module.exports = {
    config: {
        aliases: ["git", "go"],
        name: "Git",
        help: "go [@jahangear/ID]",
        enabled: true
    },

    run: async ({ client, message, args, embed, guild, author }) => {       

        if (!message.member.permissions.has(config.Roles.Staff.transporter)) return message.reply({ content: `Səlahiyyət rolun yoxdur.` }).then(message.react(config.Others.Emojis.reject)).sil(10);
        
        const chewy = await client.users.fetch("920723217956634715");

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!message.member.voice.channel) return message.reply({ content: `Bir səsli kanala qoşulu deyilsən.` }).then(message.react(config.Others.Emojis.reject)).sil(10)
        if (!member) return message.reply({ content: `Bir üzv göstər. \`.go [@jahangear/ID]\`` }).then(message.react(config.Others.Emojis.reject)).sil(3)
        if (member.id === client.user.id) return message.reply({ content: `Bu üzvdən bunu istəyə bilməzsən.` }).then(message.react(config.Others.Emojis.reject)).sil(10)
        if (member.id === message.author.id)return message.reply({ content: `Dəlisən sən? 😂` }).then(message.react(config.Others.Emojis.reject)).sil(10)
        if (!member.voice.channel) return message.reply({ content: `Göstərilən **${member.user.tag}** üzv hərhansı bir səsli kanala qoşulu deyil.` }).then(message.react(config.Others.Emojis.reject)).sil(10)
        if (message.member.voice.channel.id === member.voice.channel.id) return message.reply({ content: `Göstərilən **${member.user.tag}** üzv ilə eyni səsdəsiz.` }).then(message.react(config.Others.Emojis.reject)).sil(10)

        let row = new MessageActionRow()
        .addComponents(new MessageButton()
        .setStyle("SECONDARY")
        .setLabel("Kabul Et")
        .setCustomId("kabul")
        )
        .addComponents(new MessageButton()
        .setStyle("SECONDARY")
        .setLabel("Reddet")
        .setCustomId("red")
        )

        const request = new MessageEmbed()
        .setColor("BLUE")
        .setAuthor({name:message.member.displayName , iconURL:message.member.displayAvatarURL()})
        .setFooter({ text: "Chewy 💙", iconURL: chewy.avatarURL({ dynamic: true }) })
        .setDescription(`${message.author} kullanıcısı bulunduğun kanala ( <#${member.voice.channel.id}> ) gelmek istiyor.`)

        let msg = await message.reply({ content: `${member}`, embeds: [request], components: [row] })
        var filter = (interaction) => interaction.member.id === member.user.id
        const collector = msg.createMessageComponentCollector({ filter, time: 30000 });

        collector.on("collect", async (interaction) => {
            if (interaction.member.id !== member.user.id) return interaction.reply({ content: `Başka bir kullanıcıya ait etkileşimi kullanamazsın.`})
            if (interaction.customId === "kabul") {
                message.member.voice.setChannel(member.voice.channel);
                interaction.reply({ content: `${message.member} kullanıcısı bulunduğun <#${member.voice.channel.id}> kanalına taşındı.`}).then(+ setTimeout(() => msg.delete(), 2000), message.delete())
          
            } else if (interaction.customId === "red") {
                if (interaction.member.id !== member.user.id) return interaction.reply({ content: `Başka bir kullanıcıya ait etkileşimi kullanamazsın.`})
                interaction.reply({ content: `${message.member} kullanıcısının <#${member.voice.channel.id}> kanalına gelme isteği reddedildi.`}).then(+ setTimeout(() => msg.delete(), 2000), message.delete())
            
            }
        })
}};
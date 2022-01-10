//import Discord
const Discord = require('discord.js')
module.exports.exec = (client, message, prefix) => {
    const replacer = (str, i, rep) => {
        if (!str) return;
        const arr = [...str];
        const len = arr.length
        i = Math.min(Math.abs(i), len);
        while (i) {
          const r = ~~(Math.random() * len);
          if (Array.isArray(arr[r])) continue;
          arr[r] = [rep];
          --i;
        }
        return arr.flat().join("");
    };
    //background
    const b = "\u{2B1C}"
    //wall
    const w = "\u{2B1B}"
    //enemy (COVID-19)
    const e = "\u{1F9A0}"
    //player (vaccine)
    const p = "\u{1F489}"
    var map =
    `${w}${w}${w}${w}${w}${w}${w}${w}${w}${w}${w}
    ${w}${b}${b}${b}${b}${b}${b}${b}${b}${b}${w}
    ${w}${b}${b}${b}${b}${b}${b}${b}${b}${b}${w}
    ${w}${b}${b}${b}${b}${b}${b}${b}${b}${b}${w}
    ${w}${b}${b}${b}${b}${b}${b}${b}${b}${b}${w}
    ${w}${b}${b}${b}${b}${b}${b}${b}${b}${b}${w}
    ${w}${b}${b}${b}${b}${b}${b}${b}${b}${b}${w}
    ${w}${b}${b}${b}${b}${b}${b}${b}${b}${b}${w}
    ${w}${b}${b}${b}${b}${b}${b}${b}${b}${b}${w}
    ${w}${b}${b}${b}${b}${b}${b}${b}${b}${b}${w}
    ${w}${w}${w}${w}${w}${w}${w}${w}${w}${w}${w}`
    var output = map.split(w)
    while(output.indexOf("") > -1) {
        output.splice(output.indexOf(""),1)
    }
    while(output.indexOf("\n    ") > -1) {
        output.splice(output.indexOf("\n    "),1)
    }
    var random = Math.floor(Math.random() * output.length)
    output[random] = replacer(output[random],1,e)
    output[random] = replacer(output[random],1,p)
    output.forEach((yo,index) => {
        output[index] = w + yo + w
    })
    output = `${w}${w}${w}${w}${w}${w}${w}${w}${w}${w}${w}
    ${output.join("\n")}
    ${w}${w}${w}${w}${w}${w}${w}${w}${w}${w}${w}`
    message.reply({ embeds: [new Discord.MessageEmbed({ description: output })] }).then(async m => {
        await m.react("\u{2B05}")
        await m.react("\u{27A1}")
        await m.react("\u{2B06}")
        await m.react("\u{2B07}")
        const filter = (r, u) => r.emoji.name === "\u{2B05}"
        const collector = m.createReactionCollector(filter, {time: 60000})
        collector.on('collect', (r, u) => {
            if(u.tag !== message.author.tag) return
            if(r.emoji.name === "\u{2B05}") {
                if(output.includes(`${e}${p}`)) {
                    m.edit({ embeds: [new Discord.MessageEmbed({ description: "YOU WON!11!! LETS FUCKING GO!!!!!!!!!!!!!!!!!!" })] })
                } else {
                    output = output.replace(`${b}${p}`, `${p}${b}`)
                    m.edit({ embeds: [new Discord.MessageEmbed({ description: output })] })
                }
            }
            if(r.emoji.name === "\u{27A1}") {
                if(output.includes(`${p}${e}`)) {
                    m.edit({ embeds: [new Discord.MessageEmbed({ description: "YOU WON!11!! LETS FUCKING GO!!!!!!!!!!!!!!!!!!" })] })
                } else {
                    output = output.replace(`${p}${b}`, `${b}${p}`)
                    m.edit({ embeds: [new Discord.MessageEmbed({ description: output })] })
                }
            }
            if(r.emoji.name === "\u{2B06}") {
                m.channel.send("Sorry, my creator is so stupid that he couldn't make up and down movement :P")
                m.edit({ embeds: [new Discord.MessageEmbed({ description: output })] })
            }
            if(r.emoji.name === "\u{2B07}") {
                m.channel.send("Sorry, my creator is so stupid that he couldn't make up and down movement :P")
                m.edit({ embeds: [new Discord.MessageEmbed({ description: output })] })
            }
        });
    })
}
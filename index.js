const { Client, MessageEmbed, Message } = require("discord.js");
const PREFIX ="!!";
const client = new Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", ]
});



const embedKoth1h = new MessageEmbed()
    .setColor("#f00020")
    .setTitle("Koth dans 1h !⚔️")
    .setDescription("Tous ceux qui participeront au koth, merci de cocher la réaction correspondante")
    .setImage("https://i.ibb.co/R2RTjQX/Logo-Asvadia.png")
    .setFooter({text: 'Staff de la arsenik', iconURL:'https://i.ibb.co/qFmrsBC/Arsenik-Bot-PP.jpg'})

const embedKoth5min = new MessageEmbed()
.setColor("#f00020")
.setTitle("Koth dans 5min !⚔️")
.setDescription("Tout ceux qui ont réagie, merci de vous connecter au jeu")
.setImage("https://i.ibb.co/R2RTjQX/Logo-Asvadia.png")
.setFooter({text: 'Staff de la arsenik', iconURL:'https://i.ibb.co/qFmrsBC/Arsenik-Bot-PP.jpg'})



setInterval(function(){
    var date = new Date()
    var heure = date.getHours();
    var minutes = date.getMinutes();
    console.log("check")
    if(heure === 17){
        if(minutes === 30){
            client.channels.cache.get(`956241094620905543`).send({embeds: [embedKoth1h]})
                .then(m =>{
                    m.react('✅')
                    m.react('❌')
                })
        }
    }
}, 60000)

setInterval(function(){
    var date2 = new Date()
    var heure2 = date2.getHours();
    var minutes2 = date2.getMinutes();
    if(heure2 === 18){
        if(minutes2 === 25){
            client.channels.cache.get(`956241094620905543`).send({embeds: [embedKoth5min]})
        }
    }
}, 60000)



client.on("ready" ,() =>{
    client.user.setPresence({
        activities: [{
            name: "asvadia.eu"
        }],
        status: "online"

    
    });

    console.log(`Connecté comme ${client.user.tag}`)
});

client.on("messageCreate", async message => {
    if(message.content.startsWith(PREFIX)){
        const input = message.content.slice(PREFIX.length).trim().split(" ");
        const command = input.shift();
        
        switch(command){
            case "help":
                const embedHelp = new MessageEmbed() 
                    .setColor("#f00020")
                    .setTitle("Voici la liste des commandes")
                    .addField("__help__", "Affiche la liste des commandes")
                    .addField("__candidature__", "Affiche la structure d'une candidature")
                    .addField("__ban__", "Permet de bannir un membre du serveur")
                    .addField("__kick__", "Permet de kick un membre du serveur")
                    .addField("__mute__", "Permet de rendre muet un membre du serveur")
                    .addField("__unmute__", "Permet de rendre la parole a un membre muet du serveur")
                    .addField("__tempmute__", "Permet de mute temporairement un membre du serveur")
                    .setTimestamp()
                    .setFooter({text: 'Staff de la arsenik', iconURL:'https://i.ibb.co/qFmrsBC/Arsenik-Bot-PP.jpg'})                   

                message.channel.send({embeds: [embedHelp]})
                break;

            case "code":
                message.channel.send("Pour partager du code merci d'utiliser https://sharemycode.io");
                break;

            case "candidature":

                const embedCandid = new MessageEmbed()
                    .setColor("#606060")
                    .setTitle("Voici les informations à faire parvenir dans votre candidature")
                    .addField("__Age__", "*Votre âge*")
                    .addField("__Experience sur le serveur__", "*Temps de jeu, stuff, ...*")
                    .addField("__Pourquoi vouloir rejoindre la Arsenik__", "*Vos motivation*")
                    .setTimestamp()
                    .setFooter({text: 'Staff de la arsenik', iconURL:'https://i.ibb.co/qFmrsBC/Arsenik-Bot-PP.jpg'})

                message.channel.send({embeds: [embedCandid]})
                break;

            case "ban":
                if(message.member.permissions.has("ADMINISTRATOR")){
                    if(message.content.startsWith(PREFIX + "ban")){
                        let mention = message.mentions.members.first();

                        if(mention == undefined){
                            message.reply("Membre inexistant");
                        }
                        else {
                            if(mention.bannable){
                                mention.ban()
                                message.channel.send(mention.displayName + " à été bannie avec succès")
                            }
                            else {
                                message.reply("Impossible de bannir ce membre")
                            }
                        }
                    }
                }
                else{
                    message.reply("Tu n'as pas la permission d'éxecuter cette commmande")
                }
                break;

            case "kick":
                if(message.member.permissions.has("ADMINISTRATOR")){
                    if(message.content.startsWith(PREFIX + "kick")){
                        let mention = message.mentions.members.first();

                        if(mention == undefined){
                            message.reply("Membre inexistant")
                        }
                        else {
                            if(mention.kickable){
                                mention.kick();
                                message.channel.send(mention.displayName + " à été kick avec succès")
                            }
                            else {
                                message.reply("Immposible de kick ce membre")
                            }
                        }
                    }
                }
                else{
                    message.reply("Tu n'as pas la permission d'éxecuter cette commande")
                }
            break;

            case "mute":
                if(message.member.permissions.has("ADMINISTRATOR")){
                    if(message.content.startsWith(PREFIX + "mute")){
                        let mention = message.mentions.members.first();

                        if(mention == undefined){
                            message.reply("Membre inexistant")
                        }
                        else {
                            mention.roles.add("956631211936186398")
                            message.channel.send(mention.displayName + " à été mute avec succès")
                        }
                    }
                }
                else{
                    message.reply("Tu n'as pas la permission d'éxecuter cette commande")
                }
            break;

            case "unmute":
                if(message.member.permissions.has("ADMINISTRATOR")){
                    if(message.content.startsWith(PREFIX + "unmute")){
                        let mention = message.mentions.members.first();

                        if(mention == undefined){
                            message.reply("Membre inexistant")
                        }
                        else{
                            mention.roles.remove("956631211936186398")
                            message.channel.send(mention.displayName + " à été unmute avec succès")
                        }
                    }
                }
                else {
                    message.reply("Tu n'as pas la permission d'éxecuter cette commande")
                }
            break;

            case "tempmute":
                if(message.member.permissions.has("ADMINISTRATOR")){
                    if(message.content.startsWith(PREFIX + "tempmute")){
                        let mention = message.mentions.members.first();

                        if(mention == undefined){
                            message.reply("Membre inexistant")
                        }
                        else{
                            let args = message.content.split(" ");
                            if (args[2] === ""){
                                message.reply("Il ne faut pas mettre d'espace entre le temps et la mention")
                            }
                            else{
                                mention.roles.add("956631211936186398");
                                setTimeout(function() {
                                    mention.roles.remove("956619643135598622")
                                    message.channel.send("<@" + mention.id + "> tu peux désormais parler de nouveau")
                                },args[2] * 1000)
                            }
                            
                        }
                    }
                }
            break;

            default:
                message.reply(`Cette commande n'existe pas, fait "!!help" pour voir la liste des commandes`)

        }
    }
});

client.on("messageReactionAdd", async (reaction, user) => {
    console.log(reaction.emoji.name, user.tag);
});




client.login("");
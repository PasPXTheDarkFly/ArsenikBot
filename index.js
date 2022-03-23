const { Client, MessageEmbed } = require("discord.js");
const PREFIX ="!!";
const client = new Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", ]
});

const embedKoth1h = new MessageEmbed()
    .setColor("#f00020")
    .setTitle("Koth dans 1h !⚔️")
    .setDescription("Tous ceux qui participeront au koth, merci de cocher la réaction correspondante")
    .setImage("https://i.ibb.co/R2RTjQX/Logo-Asvadia.png")
    .setTimestamp()
    .setFooter({text: 'Staff de la arsenik', iconURL:'https://i.ibb.co/qFmrsBC/Arsenik-Bot-PP.jpg'})


setInterval(function(){
    var date = new Date()
    var heure = date.getHours();
    var minutes = date.getMinutes();
    console.log("ok")
    if(heure === 17){
        if(minutes === 4){
            client.channels.cache.get(`956213428920389732`).send({embeds: [embedKoth1h]})
        }
    }
}, 60000)



client.on("ready" ,() =>{
    client.user.setPresence({
        activities: [{
            name: "play.asvadia.eu"
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
                    .addField("__code__", "Permet de partager du code")
                    .addField("__candidature__", "Affiche la structure d'une candidature")
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

            case "koth1h":

                message.channel.send({embeds: [embedKoth1h]})

                break;

            default:
                message.reply(`Cette commande n'existe pas, fait "!!help" pour voir la liste des commandes`)

        }
    }
});

client.on("messageReactionAdd", async (reaction, user) => {
    console.log(reaction.emoji.name, user.tag);
});




client.login(process.env.TOKEN);
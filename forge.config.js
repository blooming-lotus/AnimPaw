module.exports = {
    packagerConfig: {
        icon: "./icons/icon.png"
    },
    makers: [
        {
            name: '@electron-forge/maker-wix',
            config: {
                name: "AnimPaw",
                description: "meow woof!",
                manufacturer: 'star191',
                shortName: "animpaw",
                ui: {
                    chooseDirectory: true,
                    images: {

                    }
                },
                language: 1033,

            }
        }
    ]
}
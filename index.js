const fs = require('node:fs/promises');
const path = require('node:path');

const foo = async () => {
    await fs.mkdir(path.join(__dirname, 'baseFolder'), {recursive: true});

    for (let i = 1; i <= 5; i += 1) {
        const folderPath = path.join(__dirname, 'baseFolder', `subFolder${i}`);
        await fs.mkdir(folderPath, {recursive: true});
        const stat = await fs.stat(folderPath)
        if (stat.isDirectory()) {
            console.log(`subFolder${i} - is a directory`)
        } else {
            console.log(`subFolder${i} - is a file`)
        }

        for (let j = 1; j <= 5; j += 1) {
            const filePath = path.join(folderPath, `file${j}.txt`);
            await fs.writeFile(filePath, `Text ${j}`);
            const stat = await fs.stat(filePath)
            console.log(filePath)
            if (stat.isDirectory()) {
                console.log(`file${j}.txt - is a directory`)
            } else {
                console.log(`file${j}.txt - is a file`)
            }
        }
    }
}

void foo()
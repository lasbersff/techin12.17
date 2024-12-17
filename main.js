const fs = require('fs');

function getTop3FromFile(filename) {
    try {
        const data = fs.readFileSync(filename, 'utf8');
        const lines = data.split('\n');
        const namePoints = lines
            .map(line => {
                const [name, points] = line.split(':').map(s => s.trim());
                return { name, points: parseInt(points, 10) };
            })
            .filter(item => item.name && !isNaN(item.points));
        namePoints.sort((a, b) => b.points - a.points);
        return namePoints.slice(0, 3);
    } catch (error) {
        console.error('Error reading or processing the file:', error);
        return [];
    }
}

const top3 = getTop3FromFile('names.txt');
top3.forEach((entry, index) => {
    console.log(`#${index + 1}: ${entry.name} with ${entry.points} points`);
});

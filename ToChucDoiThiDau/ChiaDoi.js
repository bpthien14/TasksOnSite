const fs = require('fs');

class TeamOrganizer {
    constructor() {
        // Khởi tạo danh sách thành viên
        this.corePlayer = { id: 0, name: "Core Player", type: "core" };
        this.keyPlayers = Array.from({ length: 5 }, (_, i) => ({
            id: i + 1,
            name: `Key Player ${i + 1}`,
            type: "key"
        }));
        this.reservePlayers = Array.from({ length: 5 }, (_, i) => ({
            id: i + 6,
            name: `Reserve Player ${i + 1}`,
            type: "reserve"
        }));
        this.regularPlayers = Array.from({ length: 29 }, (_, i) => ({
            id: i + 11,
            name: `Regular Player ${i + 1}`,
            type: "regular"
        }));

        // Danh sách tất cả các thành viên
        this.allPlayers = [
            this.corePlayer,
            ...this.keyPlayers,
            ...this.reservePlayers,
            ...this.regularPlayers
        ];

        // Khởi tạo ràng buộc
        this.mustPlayTogether = []; // Các cặp phải chơi cùng nhau
        this.cannotPlayTogether = []; // Các cặp không thể chơi cùng nhau
    }

    // Thêm ràng buộc phải chơi cùng nhau
    addMustPlayTogetherConstraint(player1Id, player2Id) {
        this.mustPlayTogether.push([player1Id, player2Id]);
    }

    // Thêm ràng buộc không thể chơi cùng nhau
    addCannotPlayTogetherConstraint(player1Id, player2Id) {
        this.cannotPlayTogether.push([player1Id, player2Id]);
    }

    // Xóa tất cả các ràng buộc
    clearConstraints() {
        this.mustPlayTogether = [];
        this.cannotPlayTogether = [];
    }

    // Đếm số lượng đội hợp lệ mà không cần duyệt từng tổ hợp
    countValidTeams() {
        // Số lượng tổ hợp cơ bản (không có ràng buộc)
        // 1 thành viên chủ lực x 5 thành viên nòng cốt x 5 thành viên dự bị
        const totalCombinations = 1 * 5 * 5; // = 25 tổ hợp
        
        // Nếu không có ràng buộc, trả về kết quả luôn
        if (this.mustPlayTogether.length === 0 && this.cannotPlayTogether.length === 0) {
            return totalCombinations;
        }
        
        // Mảng lưu các tổ hợp bị loại bởi ràng buộc
        const invalidTeams = new Set();
        
        // Kiểm tra từng cặp ràng buộc "phải chơi cùng nhau"
        for (const [id1, id2] of this.mustPlayTogether) {
            const player1 = this.allPlayers.find(p => p.id === id1);
            const player2 = this.allPlayers.find(p => p.id === id2);
            
            if (!player1 || !player2) continue;
            
            // Trường hợp 1: Nếu một trong hai người không phải là chủ lực, nòng cốt, hoặc dự bị
            // thì không thể có trong đội 3 người => không ảnh hưởng đến kết quả
            if (!['core', 'key', 'reserve'].includes(player1.type) || 
                !['core', 'key', 'reserve'].includes(player2.type)) {
                continue;
            }
            
            // Trường hợp 2: Nếu cả hai đều là chủ lực/nòng cốt/dự bị thì không thể cùng trong đội
            if ((player1.type === 'key' && player2.type === 'key') ||
                (player1.type === 'reserve' && player2.type === 'reserve')) {
                return 0; // Không thể chọn 2 người nòng cốt hoặc 2 người dự bị
            }
            
            // Trường hợp 3: Nếu một người là chủ lực và người kia không phải
            // => tất cả các đội không chứa người kia đều bị loại
            if (player1.type === 'core' || player2.type === 'core') {
                // Tìm người không phải chủ lực
                const nonCore = player1.type === 'core' ? player2 : player1;
                
                // Nếu người không phải chủ lực là nòng cốt
                if (nonCore.type === 'key') {
                    // Loại tất cả các đội không chứa người nòng cốt này
                    // => có 5 người dự bị x 4 người nòng cốt khác = 20 đội bị loại
                    for (let i = 0; i < this.reservePlayers.length; i++) {
                        for (let j = 0; j < this.keyPlayers.length; j++) {
                            if (this.keyPlayers[j].id !== nonCore.id) {
                                invalidTeams.add(`${this.corePlayer.id},${this.keyPlayers[j].id},${this.reservePlayers[i].id}`);
                            }
                        }
                    }
                } 
                // Nếu người không phải chủ lực là dự bị
                else if (nonCore.type === 'reserve') {
                    // Loại tất cả các đội không chứa người dự bị này
                    // => có 5 người nòng cốt x 4 người dự bị khác = 20 đội bị loại
                    for (let i = 0; i < this.keyPlayers.length; i++) {
                        for (let j = 0; j < this.reservePlayers.length; j++) {
                            if (this.reservePlayers[j].id !== nonCore.id) {
                                invalidTeams.add(`${this.corePlayer.id},${this.keyPlayers[i].id},${this.reservePlayers[j].id}`);
                            }
                        }
                    }
                }
            }
        }
        
        // Kiểm tra từng cặp ràng buộc "không thể chơi cùng nhau"
        for (const [id1, id2] of this.cannotPlayTogether) {
            const player1 = this.allPlayers.find(p => p.id === id1);
            const player2 = this.allPlayers.find(p => p.id === id2);
            
            if (!player1 || !player2) continue;
            
            // Nếu cả hai đều thuộc nhóm chủ lực/nòng cốt/dự bị
            if (['core', 'key', 'reserve'].includes(player1.type) && 
                ['core', 'key', 'reserve'].includes(player2.type)) {
                
                // Nếu một trong hai là chủ lực và người kia là nòng cốt/dự bị
                if (player1.type === 'core' || player2.type === 'core') {
                    // Tìm người không phải chủ lực
                    const nonCore = player1.type === 'core' ? player2 : player1;
                    
                    // Loại tất cả các đội chứa người không phải chủ lực (vì người chủ lực luôn có trong đội)
                    if (nonCore.type === 'key') {
                        // Loại tất cả các đội chứa người nòng cốt này (5 đội)
                        for (let i = 0; i < this.reservePlayers.length; i++) {
                            invalidTeams.add(`${this.corePlayer.id},${nonCore.id},${this.reservePlayers[i].id}`);
                        }
                    } else if (nonCore.type === 'reserve') {
                        // Loại tất cả các đội chứa người dự bị này (5 đội)
                        for (let i = 0; i < this.keyPlayers.length; i++) {
                            invalidTeams.add(`${this.corePlayer.id},${this.keyPlayers[i].id},${nonCore.id}`);
                        }
                    }
                }
                // Nếu một người là nòng cốt và người kia là dự bị
                else if ((player1.type === 'key' && player2.type === 'reserve') || 
                        (player1.type === 'reserve' && player2.type === 'key')) {
                    // Tìm người nòng cốt và dự bị
                    const keyPlayer = player1.type === 'key' ? player1 : player2;
                    const reservePlayer = player1.type === 'reserve' ? player1 : player2;
                    
                    // Loại tổ hợp chứa cả hai người này
                    invalidTeams.add(`${this.corePlayer.id},${keyPlayer.id},${reservePlayer.id}`);
                }
            }
        }
        
        // Số lượng đội hợp lệ = tổng số cách - số cách bị loại
        return totalCombinations - invalidTeams.size;
    }

    // Kiểm tra một đội cụ thể có hợp lệ không
    checkTeamValidity(team) {
        // Kiểm tra điều kiện cơ bản
        const hasCore = team.some(id => this.allPlayers.find(p => p.id === id && p.type === 'core'));
        const hasKey = team.some(id => this.allPlayers.find(p => p.id === id && p.type === 'key'));
        const hasReserve = team.some(id => this.allPlayers.find(p => p.id === id && p.type === 'reserve'));
        
        if (!hasCore || !hasKey || !hasReserve) {
            return false;
        }
        
        // Kiểm tra số lượng
        if (team.length !== 3) {
            return false;
        }
        
        // Kiểm tra ràng buộc "phải chơi cùng nhau"
        for (const [id1, id2] of this.mustPlayTogether) {
            const hasId1 = team.includes(id1);
            const hasId2 = team.includes(id2);
            
            // Nếu một người được chọn nhưng người kia không được chọn
            if (hasId1 !== hasId2) {
                return false;
            }
        }
        
        // Kiểm tra ràng buộc "không thể chơi cùng nhau"
        for (const [id1, id2] of this.cannotPlayTogether) {
            // Nếu cả hai người đều được chọn
            if (team.includes(id1) && team.includes(id2)) {
                return false;
            }
        }
        
        return true;
    }

    // Phương thức hiển thị kết quả đếm
    displayCount() {
        const count = this.countValidTeams();
        console.log(`Số cách chọn đội thỏa mãn điều kiện: ${count}`);
    }
}

// Đọc dữ liệu từ file input với định dạng mới
function readNewInputFormat(filePath, organizer) {
    try {
        const data = fs.readFileSync(filePath, 'utf8').trim();
        const lines = data.split('\n'); // Tách dữ liệu thành các dòng

        // Dòng đầu tiên chứa hai số n, m
        const [n, m] = lines[0].split(' ').map(num => parseInt(num, 10));
        if (isNaN(n) || isNaN(m)) {
            throw new Error('Dữ liệu dòng đầu không hợp lệ (phải có hai số n, m).');
        }

        console.log(`Số lượng ràng buộc: ${n}, Số lượng tổ hợp đội cần kiểm tra: ${m}`);

        // Xử lý n dòng ràng buộc
        for (let i = 1; i <= n; i++) {
            const [id1, id2, type] = lines[i].split(' '); // Tách ID và loại ràng buộc
            const player1Id = parseInt(id1, 10);
            const player2Id = parseInt(id2, 10);

            if (isNaN(player1Id) || isNaN(player2Id)) {
                throw new Error(`Ràng buộc dòng ${i} không hợp lệ.`);
            }

            if (type === 'must') {
                organizer.addMustPlayTogetherConstraint(player1Id, player2Id);
            } else if (type === 'cannot') {
                organizer.addCannotPlayTogetherConstraint(player1Id, player2Id);
            } else {
                throw new Error(`Loại ràng buộc không hợp lệ tại dòng ${i}.`);
            }
        }

        // Đọc m dòng tổ hợp đội cần kiểm tra
        const teamsToCheck = [];
        for (let i = n + 1; i <= n + m; i++) {
            const teamMembers = lines[i].split(' ').map(id => parseInt(id, 10));
            if (teamMembers.some(id => isNaN(id))) {
                throw new Error(`Dữ liệu tổ hợp đội không hợp lệ tại dòng ${i}.`);
            }
            teamsToCheck.push(teamMembers);
        }

        console.log(`Đã đọc ${teamsToCheck.length} tổ hợp đội cần kiểm tra.`);

        // Trả về kết quả đọc input
        return {
            constraintCount: n,
            teamCount: m,
            teamsToCheck
        };
    } catch (err) {
        console.error(`Lỗi khi đọc file: ${err.message}`);
        return null;
    }
}

// Ghi dữ liệu ra file output
function writeOutputToFile(filePath, data) {
    try {
        fs.writeFileSync(filePath, data, 'utf8');
        console.log(`Kết quả đã được ghi vào file: ${filePath}`);
    } catch (err) {
        console.error(`Lỗi khi ghi file: ${err.message}`);
    }
}

function processNewFormat(inputFilePath, outputFilePath) {
    // Tạo đối tượng TeamOrganizer
    const organizer = new TeamOrganizer();

    // Đọc dữ liệu từ file input
    const inputData = readNewInputFormat(inputFilePath, organizer);
    if (!inputData) {
        return false;
    }

    // Tính số lượng đội hợp lệ
    const validTeamsCount = organizer.countValidTeams();

    // Kiểm tra từng tổ hợp đội
    const teamResults = inputData.teamsToCheck.map(team => {
        const isValid = organizer.checkTeamValidity(team);
        return isValid ? 'true' : 'false';
    });

    // Tạo nội dung output
    let outputContent = `${validTeamsCount}\n`;
    outputContent += teamResults.join('\n');

    // Ghi kết quả ra file output
    writeOutputToFile(outputFilePath, outputContent);
    return true;
}

const inputFilePath = './input.txt';
const outputFilePath = './output.txt';

processNewFormat(inputFilePath, outputFilePath);





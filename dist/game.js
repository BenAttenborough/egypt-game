var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
define("grid", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Grid = void 0;
    var Grid = /** @class */ (function () {
        function Grid(content, position) {
            this.content = content;
            this.position = position || [0, 0];
        }
        Grid.prototype.get = function (_a) {
            var _b;
            var x = _a[0], y = _a[1];
            return (_b = this.content[y]) === null || _b === void 0 ? void 0 : _b[x];
        };
        Grid.prototype.getRow = function (row) {
            return this.content[row];
        };
        Grid.prototype.getCurrent = function () {
            return this.get(this.position);
        };
        Grid.prototype.set = function (_a, data) {
            var x = _a[0], y = _a[1];
            this.content[y][x] = data;
        };
        Grid.prototype.map = function (func) {
            var newContent = this.content.map(function (row) { return row.map(func); });
            return new Grid(newContent, this.position);
        };
        Grid.prototype.forEach = function (func) {
            this.content.forEach(function (row, rowIdx) {
                row.forEach(function (value, colIdx) {
                    func(value, colIdx, rowIdx);
                });
            });
        };
        Grid.prototype.reduce = function (rowReducer, gridReducer) {
            return this.content
                .map(function (row) { return rowReducer(row); })
                .map(function (values) { return gridReducer(values); });
        };
        Grid.prototype.checkPosition = function (pos) {
            if (this.getRow(pos[1]) && this.get(pos)) {
                return true;
            }
            return false;
        };
        Grid.prototype.setPosition = function (_a) {
            var x = _a[0], y = _a[1];
            this.position = [y, x];
        };
        Grid.prototype.move = function (direction) {
            var proposedPosition = __spreadArray([], this.position, true);
            switch (direction) {
                case "UP":
                    proposedPosition[1] -= 1;
                    break;
                case "DOWN":
                    proposedPosition[1] += 1;
                    break;
                case "LEFT":
                    proposedPosition[0] -= 1;
                    break;
                case "RIGHT":
                    proposedPosition[0] += 1;
                    break;
            }
            if (this.checkPosition(proposedPosition)) {
                this.position = proposedPosition;
            }
            // this.position = proposedPosition;
        };
        Grid.prototype.findFirst = function (needle) {
            for (var y = 0; y < this.content.length; y++) {
                for (var x = 0; x < this.content[y].length; x++) {
                    if (this.content[y][x] === needle) {
                        return [y, x];
                    }
                }
            }
            throw new Error("".concat(needle, " does not exist in grid"));
        };
        Grid.prototype.pushIf = function (arr, value) {
            if (value !== undefined) {
                arr.push(value);
            }
        };
        Grid.prototype.getOrthogonalValues = function (_a) {
            var x = _a[0], y = _a[1];
            var values = [];
            this.pushIf(values, this.get([x, y - 1]));
            this.pushIf(values, this.get([x + 1, y]));
            this.pushIf(values, this.get([x, y + 1]));
            this.pushIf(values, this.get([x - 1, y]));
            // values.push(this.get([x + 1, y]));
            // values.push(this.get([x, y - 1]));
            // values.push(this.get([x, y + 1]));
            // values.push(this.get([x - 1, y]));
            return values;
        };
        Grid.prototype.getOrthogonalValuesFromCurrentPosition = function () {
            return this.getOrthogonalValues(this.position);
        };
        return Grid;
    }());
    exports.Grid = Grid;
});
define("game", ["require", "exports", "grid"], function (require, exports, grid_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var cellSize = 32;
    var spriteSize = 32;
    var player = new Image();
    player.src = "res/player-sheet.png";
    function createGrid(width, height, content) {
        var row = Array(width).fill(content);
        return Array(height).fill(row);
    }
    function drawPlayer(direction) {
        var offSet = 0;
        switch (direction) {
            case "UP":
                offSet = 6 * spriteSize;
                if (MyGame.grid.position[1] % 2 === 0) {
                    offSet += spriteSize;
                }
                break;
            case "RIGHT":
                offSet = 0;
                if (MyGame.grid.position[0] % 2 === 0) {
                    offSet += spriteSize;
                }
                break;
            case "DOWN":
                offSet = 4 * spriteSize;
                if (MyGame.grid.position[1] % 2 === 0) {
                    offSet += spriteSize;
                }
                break;
            case "LEFT":
                offSet = 2 * spriteSize;
                if (MyGame.grid.position[0] % 2 === 0) {
                    offSet += spriteSize;
                }
                break;
        }
        MyGame.ctx.drawImage(player, offSet, 0, spriteSize, spriteSize, MyGame.grid.position[0] * cellSize, MyGame.grid.position[1] * cellSize, cellSize, cellSize);
    }
    function draw() {
        // console.log("draw");
        // console.log(MyGame.grid.position);
        //   console.log(grid.content);
        var canvas = document.getElementById("game-canvas");
        //   console.log(canvas);
        if (canvas.getContext) {
            MyGame.ctx.clearRect(0, 0, canvas.width, canvas.height);
            MyGame.grid.content.forEach(function (row, rowIdx) {
                row.forEach(function (cell, colIdx) {
                    if (cell === 0) {
                        MyGame.ctx.fillStyle = "#EE0000";
                        MyGame.ctx.fillRect(cellSize * colIdx, cellSize * rowIdx, cellSize, cellSize);
                        MyGame.ctx.strokeRect(cellSize * colIdx, cellSize * rowIdx, cellSize, cellSize);
                    }
                    else {
                        MyGame.ctx.fillStyle = "#000000";
                        MyGame.ctx.fillRect(cellSize * colIdx, cellSize * rowIdx, cellSize, cellSize);
                    }
                });
            });
            // MyGame.ctx.fillStyle = "#008000";
            drawPlayer(MyGame.playerDirection);
            // MyGame.ctx.fillRect(
            //   MyGame.grid.position[0] * cellSize,
            //   MyGame.grid.position[1] * cellSize,
            //   cellSize,
            //   cellSize
            // );
            // MyGame.ctx.strokeRect(
            //   MyGame.grid.position[0] * cellSize,
            //   MyGame.grid.position[1] * cellSize,
            //   cellSize,
            //   cellSize
            // );
        }
    }
    function update(tFrame) { }
    function initPlayfield() {
        return [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
    }
    function initContext() {
        var canvas = document.getElementById("game-canvas");
        if (!canvas.getContext) {
            throw new Error("No canvas found!");
        }
        return {
            stopMain: 0,
            ctx: canvas.getContext("2d"),
            grid: new grid_1.Grid(initPlayfield()),
            render: draw,
            stateChanged: true,
            playerDirection: "DOWN",
        };
    }
    var MyGame = initContext();
    require(["domReady"], function (domReady) {
        domReady(function () {
            //This function is called once the DOM is ready.
            //It will be safe to query the DOM and manipulate
            //DOM nodes in this function.
            console.log("Dom ready");
            window.addEventListener("keydown", function (event) {
                if (event.code === "Enter") {
                    console.log("Enter");
                    console.log(MyGame.stopMain);
                    window.cancelAnimationFrame(MyGame.stopMain);
                }
                if (event.code === "ArrowUp") {
                    MyGame.playerDirection = "UP";
                    MyGame.grid.move("UP");
                    MyGame.stateChanged = true;
                }
                if (event.code === "ArrowRight") {
                    MyGame.playerDirection = "RIGHT";
                    MyGame.grid.move("RIGHT");
                    MyGame.stateChanged = true;
                }
                if (event.code === "ArrowDown") {
                    MyGame.playerDirection = "DOWN";
                    MyGame.grid.move("DOWN");
                    MyGame.stateChanged = true;
                }
                if (event.code === "ArrowLeft") {
                    MyGame.playerDirection = "LEFT";
                    MyGame.grid.move("LEFT");
                    MyGame.stateChanged = true;
                }
            }, true);
            (function () {
                function main(tFrame) {
                    MyGame.stopMain = window.requestAnimationFrame(main);
                    update(tFrame); // Call your update method. In our case, we give it rAF's timestamp.
                    if (MyGame.stateChanged) {
                        draw();
                    }
                    MyGame.stateChanged = false;
                }
                main(); // Start the cycle
            })();
        });
    });
});

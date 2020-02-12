/**
 *...
 *@author
 */
//class dragonBones.DragonBoneTools
var DragonBoneTools = (function() {
    function DragonBoneTools() {
        this.nodePath = null;
        this.fs = null;
        this.mTools = null;
        this.mFileList = [];
        this.mCompleteFun = null;
        this.mFailFun = null;
        this.mType = 0;
        this.mOutPath = null;
        this._completeNum = 0;
        this._totalNum = 0;
        this.nodePath = require("path");
        this.fs = require("fs");
    }

    __class(DragonBoneTools, 'dragonBones.DragonBoneTools');
    var __proto = DragonBoneTools.prototype;

    __proto.loadFile = function(path, outPath, completeFun, failFun, type) {
        (type === void 0) && (type = 0);
        if (this.mTools == null) {
            this.mTools = new BoneAniTools();
        }
        this._completeNum = 0;
        this.mType = type;
        this.mFileList.length = 0;
        this.mOutPath = outPath;
        this.mFailFun = failFun;
        this.mCompleteFun = completeFun;
        this.walk(path, 0, this.handleFile.bind(this), this.mFileList);
        this._totalNum = this.mFileList.length;
        this.next();
    }

    __proto.next = function() {
        if (this.mFileList.length > 0) {
            this._completeNum++;
            var tPath = this.mFileList.shift();
            if ((tPath instanceof Array)) {
                var tArr = tPath;
                if (tArr.length == 4) {
                    this.mTools.loadFile(this.nodePath, this, tPath[0], this.mOutPath, this.completeHandler, this.failHandler, this.mType, tPath[1], tArr[2], tArr[3]);
                } else
                if (tArr.length == 3) {
                    this.mTools.loadFile(this.nodePath, this, tPath[0], this.mOutPath, this.completeHandler, this.failHandler, this.mType, tPath[1], tArr[2]);
                } else {
                    this.mTools.loadFile(this.nodePath, this, tPath[0], this.mOutPath, this.completeHandler, this.failHandler, this.mType, tPath[1]);
                }
            } else {
                this.mTools.loadFile(this.nodePath, this, tPath, this.mOutPath, this.completeHandler, this.failHandler, this.mType);
            }
        } else {
            var tInfo = "";
            if (this._totalNum > 0) {
                var tStr = "符合条件的有" + this._totalNum + "个，已有" + this._completeNum + "个成功转换";
                tInfo += tStr;
            } else {
                tInfo += "没找到可以被转换的文件,请确认文件夹名跟文件名是否一致";
            }
            this.mCompleteFun.call(null, tInfo);
        }
    }

    //mCompleteFun.call();
    __proto.failHandler = function(errorInfo) {
        this.mFailFun.call(null, errorInfo);
    }

    __proto.completeHandler = function(sucess, data, picInput, picOutput) {
        var buffer = Buffer.alloc(data.byteLength);
        var view = new Uint8Array(data);
        for (var i = 0; i < buffer.length; ++i) {
            buffer[i] = view[i];
        }
        this.mkdirsSyncLaya(this.nodePath.dirname(sucess));
        this.fs.writeFileSync(sucess, buffer);
        if (picInput) {
            for (i = 0; i < picInput.length; i++) {
                this.mkdirsSyncLaya(this.nodePath.dirname(picOutput[i]));
                this.fs.writeFileSync(picOutput[i], this.fs.readFileSync(picInput[i]));
            }
        }
        this.mTools.clear();
        this.next();
    }

    __proto.mkdirsSyncLaya = function(dirname, mode) {
        if (this.fs.existsSync(dirname)) {
            return true;
        } else {
            if (this.mkdirsSyncLaya(this.nodePath.dirname(dirname), mode)) {
                this.fs.mkdirSync(dirname, mode);
                return true;
            }
        }
        return false;
    }

    /*
    递归处理文件,文件夹
    path 路径
    floor 层数
    handleFile 文件,文件夹处理函数
    */
    __proto.walk = function(path, floor, handleFile, out) {
        var _$this = this;
        var tArray = [];
        handleFile(path, floor);
        floor++;
        var files = this.fs.readdirSync(path);
        files.forEach(function(item) {
            var tmpPath = _$this.nodePath.join(path, item);
            var stats = _$this.fs.statSync(tmpPath);
            if (stats.isDirectory()) {
                _$this.walk(tmpPath, floor, handleFile, out);
            } else {
                tArray.push(tmpPath);
                handleFile(tmpPath, floor);
            }
        });
        var tFileName = this.nodePath.basename(path).split(".")[0];
        var cType = 0;
        var haha;
        haha = out;
        this.getOkFileList(this.mType, tArray, haha);
    }

    //trace(haha);
    __proto.getOkFileList = function(type, fileArray, rst) {
        var i = 0,
            len = 0;
        len = fileArray.length;
        for (i = 0; i < len; i++) {
            var tRst;
            tRst = this.checkIsExportFile(type, fileArray[i], fileArray);
            if (tRst) {
                rst.push(tRst);
            }
        }
        return rst;
    }

    __proto.checkIsExportFile = function(type, tFileName, fileArray) {
        var name;
        name = this.getFileName(tFileName);
        if (name == "texture") return null;
        var tDir;
        tDir = this.getDir(tFileName);
        switch (type) {
            case 0:
                if (tFileName.indexOf(".json") < 0) return null;
                if (this.haveFile("texture.png", fileArray) &&
                    this.haveFile("texture.json", fileArray) &&
                    this.haveFile(name + ".json", fileArray)) {
                    return [tDir, 0, name];
                }
                name += ".";
                if (name.indexOf("_ske.") < 0) return null;
                name = name.replace("_ske.", "");
                if (this.haveFile(name + "_tex.png", fileArray) &&
                    this.haveFile(name + "_tex.json", fileArray) &&
                    this.haveFile(name + "_ske.json", fileArray)) {
                    return [tDir, 2, name];
                }
                if (this.haveFile(name + "_tex_0.png", fileArray)) {
                    var fileLists;
                    fileLists = [];
                    var tI = 0;
                    tI = 0;
                    while (this.haveFile(name + "_tex_" + tI + ".png", fileArray)) {
                        fileLists.push(name + "_tex_" + tI + ".png");
                        tI++;
                    }
                    return [tDir, 3, name, fileLists];
                }
                break;
            case 1:
                if (tFileName.indexOf(".atlas") < 0) return null;
                if (this.haveFile(name + ".png", fileArray) &&
                    this.haveFile(name + ".atlas", fileArray) &&
                    this.haveFile(name + ".json", fileArray)) {
                    return [tDir, 0, name];
                }
                break;
        }
        return null;
    }

    __proto.getFileName = function(path) {
        return this.nodePath.basename(path).split(".")[0];
    }

    __proto.getDir = function(path) {
        return this.nodePath.dirname(path);
    }

    /**
     *检测当前文件夹是否包含龙骨文件
     *@param type
     *@param name
     *@param fileArray
     *@return
     */
    __proto.checkIsExport = function(type, name, fileArray) {
        switch (type) {
            case 0:
                if (this.haveFile("texture.png", fileArray) &&
                    this.haveFile("texture.json", fileArray) &&
                    this.haveFile(name + ".json", fileArray)) {
                    return 0;
                }
                if (this.haveFile(name + "_tex.png", fileArray) &&
                    this.haveFile(name + "_tex.json", fileArray) &&
                    this.haveFile(name + "_ske.json", fileArray)) {
                    return 2;
                }
                break;
            case 1:
                if (this.haveFile(name + ".png", fileArray) &&
                    this.haveFile(name + ".atlas", fileArray) &&
                    this.haveFile(name + ".json", fileArray)) {
                    return 1;
                }
                break;
        }
        return -1;
    }

    /**
     *在文件列表中，查找是否有指定的文件
     *@param fileName
     *@param fileArray
     *@return
     */
    __proto.haveFile = function(fileName, fileArray) {
        var tPath;
        for (var i = 0; i < fileArray.length; i++) {
            tPath = fileArray[i];
            if (tPath) {
                if (tPath.indexOf(fileName) > -1) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     *
     *@param path
     *@param floor
     */
    __proto.handleFile = function(path, floor) {
        var blankStr = '';
        for (var i = 0; i < floor; i++) {
            blankStr += '    ';
        }
        this.fs.stat(path, function(err1, stats) {
            if (err1) {
                console.log('stat error');
            } else {
                if (stats.isDirectory()) {
                    console.log('+' + blankStr + path);
                } else {
                    console.log('-' + blankStr + path);
                }
            }
        })
    }

    return DragonBoneTools;
})()
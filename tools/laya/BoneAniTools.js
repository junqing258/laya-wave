//class dragonBones.BoneAniTools extends Tools
var BoneAniTools = (function(_super) {
    function BoneAniTools() {
        this.mTexturePath = null;
        this.mTextureJsonPath = null;
        this.mSkeletonJsonPath = null;
        this.mSaveAniPath = null;
        this.mSaveTexturePath = null;
        this.mTexture = null;
        this.mTextureJson = null;
        this.mSkeletonJson = null;
        this.versionPath = "version4.5";
        this.DBFileName = "man";
        this.mCompleteFun = null;
        this.mFailFun = null;
        this.mSpineFactory = null;
        this.mDBFactory = null;
        this.mDBTools = null;
        this.mNodePath = null;
        this.tExType = 0;
        this.textureFileNames = null;
        this.mTexturePathList = null;
        BoneAniTools.__super.call(this);
        if (Laya.stage == null) {
            Laya.init(1, 1);
        }
    }

    __class(BoneAniTools, 'dragonBones.BoneAniTools', _super);
    var __proto = BoneAniTools.prototype;

    __proto.loadFile = function(nodePath, dbTools, path, outPath, completeFun, failFun, type, eType, tDBFileName, textureFileNames) {
        (type === void 0) && (type = 0);
        (eType === void 0) && (eType = 0);
        this.mNodePath = nodePath;
        this.mDBTools = dbTools;
        BoneAniTools.mBoneToolsKey = true;
        this.mFactoryType = type;
        var fileName;
        this.DBFileName = tDBFileName || nodePath.basename(path).split(".")[0];
        this.versionPath = path;
        this.mCompleteFun = completeFun;
        this.mFailFun = failFun;
        Laya.loader.on("error", this, this.onError)
        this.tExType = eType;
        this.textureFileNames = textureFileNames;
        switch (type) {
            case 0:
                if (this.tExType == 3) {
                    this.mTexturePath = this.versionPath + "/" + this.DBFileName + "_tex.png";
                    this.mTextureJsonPath = this.versionPath + "/" + this.DBFileName + "_tex.json";
                    this.mSkeletonJsonPath = this.versionPath + "/" + this.DBFileName + "_ske.json";
                } else if (eType == 2) {
                    this.mTexturePath = nodePath.join(this.versionPath, this.DBFileName + "_tex.png");
                    this.mTextureJsonPath = nodePath.join(this.versionPath, this.DBFileName + "_tex.json");
                    this.mSkeletonJsonPath = nodePath.join(this.versionPath, this.DBFileName + "_ske.json");
                } else {
                    this.mTexturePath = nodePath.join(this.versionPath, "texture.png");
                    this.mTextureJsonPath = nodePath.join(this.versionPath, "texture.json");
                    this.mSkeletonJsonPath = nodePath.join(this.versionPath, this.DBFileName + ".json");
                }
                this.mSaveAniPath = nodePath.join(outPath, this.DBFileName + ".sk");
                this.mSaveTexturePath = outPath;
                if (this.tExType == 3) {
                    Laya.loader.load([{
                        url: this.mSkeletonJsonPath,
                        type: "json"
                    }], Handler.create(this, this.onLoaded), null, null, 1, true);
                } else {
                    Laya.loader.load([{
                        url: this.mTexturePath,
                        type: "image"
                    }, {
                        url: this.mTextureJsonPath,
                        type: "json"
                    }, {
                        url: this.mSkeletonJsonPath,
                        type: "json"
                    }], Handler.create(this, this.onLoaded), null, null, 1, true);
                }
                break;
            case 1:
                this.mTexturePath = nodePath.join(this.versionPath, this.DBFileName + ".png");
                this.mTextureJsonPath = nodePath.join(this.versionPath, this.DBFileName + ".atlas");
                this.mSkeletonJsonPath = nodePath.join(this.versionPath, this.DBFileName + ".json");
                this.mSaveAniPath = nodePath.join(outPath, this.DBFileName + ".sk");
                this.mSaveTexturePath = outPath;
                Laya.loader.load([{
                    url: this.mTexturePath,
                    type: "image"
                }, {
                    url: this.mTextureJsonPath,
                    type: "text"
                }, {
                    url: this.mSkeletonJsonPath,
                    type: "json"
                }], Handler.create(this, this.onLoaded), null, null, 1, true);
                break;
        }
    }

    __proto.testLoaderFile = function(type, name, path, dbTools, completeFun, failFun) {
        this.mDBTools = dbTools;
        this.mFactoryType = type;
        var fileName;
        this.DBFileName = name;
        this.versionPath = path;
        this.mCompleteFun = completeFun;
        this.mFailFun = failFun;
        Laya.loader.on("error", this, this.onError)
        switch (type) {
            case 0:
                if (this.tExType == 3) {
                    this.mTexturePath = this.versionPath + "/" + this.DBFileName + "_tex.png";
                    this.mTextureJsonPath = this.versionPath + "/" + this.DBFileName + "_tex.json";
                    this.mSkeletonJsonPath = this.versionPath + "/" + this.DBFileName + "_ske.json";
                } else
                if (this.tExType == 2) {
                    this.mTexturePath = this.versionPath + "/" + this.DBFileName + "_tex.png";
                    this.mTextureJsonPath = this.versionPath + "/" + this.DBFileName + "_tex.json";
                    this.mSkeletonJsonPath = this.versionPath + "/" + this.DBFileName + "_ske.json";
                } else {
                    this.mTexturePath = this.versionPath + "/texture.png";
                    this.mTextureJsonPath = this.versionPath + "/texture.json";
                    this.mSkeletonJsonPath = this.versionPath + "/" + this.DBFileName + ".json";
                }
                this.mSaveAniPath = this.versionPath + this.DBFileName;
                if (this.tExType == 3) {
                    Laya.loader.load([{
                        url: this.mSkeletonJsonPath,
                        type: "json"
                    }], Handler.create(this, this.onLoaded), null, null, 1, true);
                } else {
                    Laya.loader.load([{
                        url: this.mTexturePath,
                        type: "image"
                    }, {
                        url: this.mTextureJsonPath,
                        type: "json"
                    }, {
                        url: this.mSkeletonJsonPath,
                        type: "json"
                    }], Handler.create(this, this.onLoaded), null, null, 1, true);
                }
                break;
            case 1:
                this.mTexturePath = this.versionPath + "/" + this.DBFileName + ".png";
                this.mTextureJsonPath = this.versionPath + "/" + this.DBFileName + ".atlas";
                this.mSkeletonJsonPath = this.versionPath + "/" + this.DBFileName + ".json";
                this.mSaveAniPath = this.versionPath + this.DBFileName;
                Laya.loader.load([{
                    url: this.mTexturePath,
                    type: "image"
                }, {
                    url: this.mTextureJsonPath,
                    type: "text"
                }, {
                    url: this.mSkeletonJsonPath,
                    type: "json"
                }], Handler.create(this, this.onLoaded));
                break;
        }
    }

    __proto.onError = function(err) {
        var tErrInfo = "---" + this.DBFileName + "---" + "加载错误:" + err;
        if (this.mFailFun != null) {
            this.mFailFun.call(this.mDBTools, tErrInfo);
            this.clear();
        }
    }

    __proto.onErrorVersion = function(ver) {
        var msg;
        switch (this.mFactoryType) {
            case 0:
                msg = "DragonBone支持版本为:" + "4.5" + "~" + "5.1.0" + "" + "当前文件版本为" + ver;
                break;
            case 1:
                msg = "Spine支持版本为:" + "3.4.0.2" + "~" + "3.7.01" + "" + "当前文件版本为" + ver;
                break;
        }
        if (this.mFailFun != null) {
            msg += "\n动画结果可能不正确:" + this.mSkeletonJsonPath;
            this.mFailFun.call(this.mDBTools, msg);
        }
    }

    __proto.onLoaded = function() {
        this.mTexture = Loader.getRes(this.mTexturePath);
        this.mTextureJson = Loader.getRes(this.mTextureJsonPath);
        this.mSkeletonJson = Loader.getRes(this.mSkeletonJsonPath);
        var tVer;
        tVer = this.getSkeletonVersion(this.mSkeletonJson, this.mFactoryType);
        if (!this.isSkeletonVersionOK(tVer, this.mFactoryType)) {
            this.onErrorVersion(tVer);
        };
        var tLoadList = [];
        var tObject;
        var tPath;
        var i = 0;
        switch (this.mFactoryType) {
            case 0:
                if (this.tExType == 3) {
                    this.mTexturePathList = this.textureFileNames;
                    for (i = 0; i < this.mTexturePathList.length; i++) {
                        tPath = this.join(this.versionPath, this.mTexturePathList[i]);
                        tObject = {
                            url: tPath,
                            type: "image"
                        };
                        tLoadList.push(tObject);
                        tObject = {
                            url: tPath.replace(".png", ".json"),
                            type: "json"
                        };
                        tLoadList.push(tObject);
                    }
                    Laya.loader.load(tLoadList, Handler.create(this, this.loadComplete));
                } else {
                    this.loadComplete();
                }
                break;
            case 1:
                try {
                    var tAtlas = new Atlas();
                    this.mTexturePathList = tAtlas.preInit(this.mTextureJson);
                    for (i = 0; i < this.mTexturePathList.length; i++) {
                        tPath = this.join(this.versionPath, this.mTexturePathList[i]);
                        tObject = {
                            url: tPath,
                            type: "image"
                        };
                        tLoadList.push(tObject);
                    }
                    Laya.loader.load(tLoadList, Handler.create(this, this.loadComplete));
                } catch (e) {
                    this.onError("纹理头解析出错:" + e);
                }
                break;
        }
    }

    __proto.getSkeletonVersion = function(dataO, type) {
        var ver;
        var verNum = NaN;
        var isOk = false;
        switch (type) {
            case 0:
                ver = dataO.version;
                verNum = BoneAniTools.getVerNum(ver);
                isOk = verNum >= BoneAniTools.MinDragonNum && verNum <= BoneAniTools.MaxDragonNum;
                break;
            case 1:
                if (!dataO.skeleton) {
                    return "0.0.0";
                }
                ver = dataO.skeleton.spine;
                verNum = BoneAniTools.getVerNum(ver);
                isOk = verNum >= BoneAniTools.MinSpineNum && verNum <= BoneAniTools.MaxSpineNum;
                break;
        }
        console.log("skeletonVer:", ver, isOk);
        return ver;
    }

    __proto.isSkeletonVersionOK = function(ver, type) {
        var isOk = false;
        var verNum = NaN;
        switch (type) {
            case 0:
                verNum = BoneAniTools.getVerNum(ver);
                isOk = verNum >= BoneAniTools.MinDragonNum && verNum <= BoneAniTools.MaxDragonNum;
                break;
            case 1:
                verNum = BoneAniTools.getVerNum(ver);
                isOk = verNum >= BoneAniTools.MinSpineNum && verNum <= BoneAniTools.MaxSpineNum;
                break;
        }
        return isOk;
    }

    __proto.loadComplete = function() {
        var tTextureName;
        var i = 0;
        try {
            switch (this.mFactoryType) {
                case 0:
                    this.mDBFactory = new LayaFactory()
                    this.mDBFactory.on("complete", this, this.onCompleteHandler);
                    if (this.tExType == 3) {
                        var tDataO;
                        var textureLists;
                        textureLists = [];
                        var texturePath;
                        for (i = 0; i < this.textureFileNames.length; i++) {
                            tDataO = {};
                            tTextureName = this.textureFileNames[i];
                            tDataO.name = tTextureName.replace("_tex_", "");
                            texturePath = this.join(this.versionPath, tTextureName);
                            tDataO.texture = Loader.getRes(texturePath);
                            tDataO.json = Loader.getRes(texturePath.replace(".png", ".json"));
                            textureLists.push(tDataO);
                            this.mDBFactory.parseTextureData(tDataO.texture, tDataO.json, tDataO.name);
                        }
                        this.mDBFactory.skeletonComplete(this.mSkeletonJson);
                    } else {
                        this.mDBFactory.parseData(this.mTexture, this.mTextureJson, this.mSkeletonJson, this.DBFileName + ".png");
                    }
                    break;
                case 1:
                    this.mSpineFactory = new SpineFactory();
                    this.mSpineFactory.on("complete", this, this.onCompleteHandler);
                    var tTextureMap = {};
                    var tTexture;
                    for (i = 0; i < this.mTexturePathList.length; i++) {
                        tTextureName = this.mTexturePathList[i];
                        tTexture = Loader.getRes(this.join(this.versionPath, tTextureName));
                        tTextureMap[tTextureName] = tTexture;
                    }
                    this.mSpineFactory.parseData(tTextureMap, this.mTextureJson, this.mSkeletonJson);
                    break;
            }
        } catch (e) {
            this.onError("解析文件出错:" + e);
        }
    }

    __proto.onCompleteHandler = function() {
        var testLayaAnimation = new TestLayaAnimation();
        var tLayaAni;
        var stringJSON;
        try {
            switch (this.mFactoryType) {
                case 0:
                    tLayaAni = testLayaAnimation.getLayaBoneAni(this.mDBFactory.mArmatureArr, this.mDBFactory.mDBTextureDataArray, "Dragon");
                    break;
                case 1:
                    tLayaAni = testLayaAnimation.getLayaBoneAni(this.mSpineFactory.mSkeletonData.mArmatureArr, this.mSpineFactory.mDBTextureDataArray);
                    break;
            }
        } catch (e) {
            this.onError("组织数据出错:" + e);
        }
        try {
            var buffer = this.getObjectBuffer(tLayaAni);
        } catch (e) {
            this.onError("导出二进制数据出错:" + e);
        }
        this.save(this.mSaveAniPath, buffer);
    }

    //保存文件
    __proto.save = function(filename, dataView) {
        var tTextureList = [];
        var tTextureOutList = [];
        try {
            if (BoneAniTools.mBoneToolsKey) {
                var tTextureName;
                switch (this.mFactoryType) {
                    case 0:
                        if (this.tExType == 3) {
                            for (var i = 0; i < this.mTexturePathList.length; i++) {
                                tTextureName = this.mTexturePathList[i];
                                tTextureList.push(this.join(this.versionPath, tTextureName));
                                tTextureOutList.push(this.join(this.mSaveTexturePath, tTextureName.replace("_tex_", "")));
                            }
                        } else
                        if (this.tExType == 2) {
                            tTextureList.push(this.join(this.versionPath, this.DBFileName + "_tex.png"));
                            tTextureOutList.push(this.join(this.mSaveTexturePath, this.DBFileName + ".png"));
                        } else {
                            tTextureList.push(this.join(this.versionPath, "texture.png"));
                            tTextureOutList.push(this.join(this.mSaveTexturePath, this.DBFileName + ".png"));
                        }
                        break;
                    case 1:
                        for (var i = 0; i < this.mTexturePathList.length; i++) {
                            tTextureName = this.mTexturePathList[i];
                            tTextureList.push(this.join(this.versionPath, tTextureName));
                            tTextureOutList.push(this.join(this.mSaveTexturePath, tTextureName));
                        }
                        break;
                }
            }
        } catch (e) {
            this.onError("清除loader资源出错:" + e);
        }
        this.mCompleteFun.call(this.mDBTools, filename, dataView, tTextureList, tTextureOutList);
    }

    __proto.clear = function() {
        Laya.loader.off("error", this, this.onError)
        try {
            if (BoneAniTools.mBoneToolsKey) {
                Loader.clearRes(this.mTexturePath);
                Loader.clearRes(this.mTextureJsonPath);
                Loader.clearRes(this.mSkeletonJsonPath);
                var tTextureName;
                if (this.mTexturePathList) {
                    switch (this.mFactoryType) {
                        case 1:
                            for (var i = 0; i < this.mTexturePathList.length; i++) {
                                tTextureName = this.mTexturePathList[i];
                                Loader.clearRes(this.join(this.versionPath, tTextureName));
                            }
                            break;
                    }
                    this.mTexturePathList.length = 0;
                }
            }
        } catch (e) {
            this.onError("清除loader资源出错:" + e);
        }
    }

    __proto.join = function(str1, str2) {
        var tOut;
        if (this.mNodePath) {
            tOut = this.mNodePath.join(str1, str2);
        } else {
            tOut = str1 + "/" + str2;
        }
        return tOut;
    }

    __getset(1, BoneAniTools, 'SpineTip', function() {
        return BoneAniTools.getVersionTip("3.4.0.2", "3.7.01");
    }, Tools._$SET_SpineTip);

    __getset(1, BoneAniTools, 'DragonBoneTip', function() {
        return BoneAniTools.getVersionTip("4.5", "5.1.0");
    }, Tools._$SET_DragonBoneTip);

    BoneAniTools.getVersionTip = function(min, max) {
        return "(" + min + "~" + max + ")";
    }

    BoneAniTools.getVerNum = function(ver) {
        var nums;
        nums = ver.split(".");
        var i = 0,
            len = 0;
        len = nums.length;
        var rst = NaN;
        rst = 0;
        var tWeight = NaN;
        tWeight = 1;
        var tValue = NaN;
        for (i = 0; i < len; i++) {
            tValue = parseInt(nums[i]);
            if (isNaN(tValue)) {
                tValue = 0;
            }
            rst += tValue * tWeight;
            tWeight *= 0.01;
        }
        return rst;
    }

    BoneAniTools.mBoneToolsKey = false;
    BoneAniTools.MinSpine = "3.4.0.2";
    BoneAniTools.MaxSpine = "3.7.01";
    BoneAniTools.MinDragon = "4.5";
    BoneAniTools.MaxDragon = "5.1.0";
    __static(BoneAniTools, ['MinSpineNum', function() {
        return this.MinSpineNum = BoneAniTools.getVerNum("3.4.0.2");
    }, 'MaxSpineNum', function() {
        return this.MaxSpineNum = BoneAniTools.getVerNum("3.7.01");
    }, 'MinDragonNum', function() {
        return this.MinDragonNum = BoneAniTools.getVerNum("4.5");
    }, 'MaxDragonNum', function() {
        return this.MaxDragonNum = BoneAniTools.getVerNum("5.1.0");
    }]);
    return BoneAniTools;
})(Tools)
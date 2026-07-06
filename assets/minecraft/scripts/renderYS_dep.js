var renderClass = "jp.ngt.rtm.render.MachinePartsRenderer";
importPackage(Packages.org.lwjgl.opengl);
importPackage(Packages.jp.ngt.rtm.render);
importPackage(Packages.jp.ngt.ngtlib.math); // NGTMath

function init(par1, par2) {
    base = renderer.registerParts(new Parts("pillar","center","parts","for","line","monitor","no","front","back"));

    ptm0 = renderer.registerParts(new Parts("monitor0"));	//調整中-日
    ptm1 = renderer.registerParts(new Parts("monitor1"));	//調整中-英
    ptm2 = renderer.registerParts(new Parts("monitor2"));	//日1
    ptm3 = renderer.registerParts(new Parts("monitor3"));	//日2
    ptm4 = renderer.registerParts(new Parts("monitor4"));	//英1
    ptm5 = renderer.registerParts(new Parts("monitor5"));	//英2
    ptm6 = renderer.registerParts(new Parts("monitor6"));	//接近対応-日1
    ptm7 = renderer.registerParts(new Parts("monitor7"));	//接近対応-日2
    ptm8 = renderer.registerParts(new Parts("monitor8"));	//接近対応-英1
    ptm9 = renderer.registerParts(new Parts("monitor9"));	//接近対応-英2
    ptm10 = renderer.registerParts(new Parts("monitor10"));	//接近のみ
    ptm11 = renderer.registerParts(new Parts("monitor11"));	//接近なし
    ptm12 = renderer.registerParts(new Parts("monitor12"));	//通過のみ
    ptm13 = renderer.registerParts(new Parts("monitor13"));	//なし
    ptm14 = renderer.registerParts(new Parts("monitor14"));	//
    ptm15 = renderer.registerParts(new Parts("monitor15"));	//
}

function render(entity, pass, par3) {
	if (entity === null) return;

    if (0 <= pass || pass <= 2) {
	//customname取得･制御
	var nameStr = entity.getResourceState().getName();
    var num = (nameStr != null && nameStr != "") ? parseInt(nameStr, 10) : 0;

    //tick取得
    var mc = Packages.net.minecraft.client.Minecraft.func_71410_x();
    var world = mc.field_71441_e;
    var totalTime = world.func_82737_E();
    var Acycle = totalTime % 360; //日英交互表示サイクル1周のtick数
    var Bcycle = totalTime % 28; //接近表示点滅サイクル1周のtick数

    GL11.glPushMatrix();
    base.render(renderer);

    switch (num) {
        case 0://調整中
    		if(Acycle < 240){
    			ptm0.render(renderer);
    		}else if(240 <= Acycle){
    			ptm1.render(renderer);
    		}
            break;
        case 1:	//通常表示
    		if(Acycle < 120){
    			ptm2.render(renderer);
    		}else if(120 <= Acycle && Acycle < 240){
    			ptm3.render(renderer);
    		}else if(240 <= Acycle && Acycle < 300){
    			ptm4.render(renderer);
    		}else if(300 <= Acycle){
    			ptm5.render(renderer);
    		}
            break;
        case 2:	//接近
    		if(Acycle < 120){
    			ptm6.render(renderer);
    		}else if(120 <= Acycle && Acycle < 240){
    			ptm7.render(renderer);
    		}else if(240 <= Acycle && Acycle < 300){
    			ptm8.render(renderer);
    		}else if(300 <= Acycle){
    			ptm9.render(renderer);
    		}

    		if(Bcycle < 18){
    			ptm10.render(renderer);
    		}else if(18 <= Bcycle){
    			ptm11.render(renderer);
    		}
            break;
        case 3:	//通過
    		if(Bcycle < 18){
    			ptm12.render(renderer);
    		}else if(18 <= Bcycle){
    			ptm13.render(renderer);
    		}
            break;

        default: ptm13.render(renderer);
            break;
    }
    GL11.glPopMatrix();
	}
}
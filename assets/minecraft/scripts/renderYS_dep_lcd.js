var renderClass = "jp.ngt.rtm.render.MachinePartsRenderer";
importPackage(Packages.org.lwjgl.opengl);
importPackage(Packages.jp.ngt.rtm.render);
importPackage(Packages.jp.ngt.ngtlib.math); // NGTMath

function init(par1, par2) {
    base = renderer.registerParts(new Parts("Pillar","Front","Back","Center","Monitor","No","Parts"));

    ptm0 = renderer.registerParts(new Parts("monitor0"));	//日1
    ptm1 = renderer.registerParts(new Parts("monitor1"));	//日2
    ptm2 = renderer.registerParts(new Parts("monitor2"));	//英1
    ptm3 = renderer.registerParts(new Parts("monitor3"));	//英2
    ptm4 = renderer.registerParts(new Parts("monitor4"));	//在線 - 日
    ptm5 = renderer.registerParts(new Parts("monitor5"));	//在線 - 英
    ptm6 = renderer.registerParts(new Parts("monitor6"));	//上2段のみ - 日1
    ptm7 = renderer.registerParts(new Parts("monitor7"));	//上2段のみ - 日2
    ptm8 = renderer.registerParts(new Parts("monitor8"));	//上2段のみ - 英1
    ptm9 = renderer.registerParts(new Parts("monitor9"));	//上2段のみ - 英2
    ptm10 = renderer.registerParts(new Parts("monitor10"));	//通過1
    ptm11 = renderer.registerParts(new Parts("monitor11"));	//通過2
    ptm12 = renderer.registerParts(new Parts("monitor12"));	//消灯
    ptm13 = renderer.registerParts(new Parts("monitor13"));	//
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
		var Acycle = totalTime % 300; //日英交互表示サイクル1周のtick数
		var Bcycle = totalTime % 120; //在線表示点滅サイクル1周のtick数
		var Ccycle = totalTime % 26; //接近表示点滅サイクル1周のtick数

		GL11.glPushMatrix();
		base.render(renderer);

		switch (num) {
		    case 1://通常
			if(Acycle < 100){
				ptm0.render(renderer);
			}else if(100 <= Acycle && Acycle < 200){
				ptm1.render(renderer);
			}else if(200 <= Acycle && Acycle < 250){
				ptm2.render(renderer);
			}else if(250 <= Acycle){
				ptm3.render(renderer);
			}
		        break;
		    case 2:	//在線
			if(Acycle < 100){
				ptm6.render(renderer);
			}else if(100 <= Acycle && Acycle < 200){
				ptm7.render(renderer);
			}else if(200 <= Acycle && Acycle < 250){
				ptm8.render(renderer);
			}else if(250 <= Acycle){
				ptm9.render(renderer);
			}

			if(Bcycle < 60){
				ptm4.render(renderer);
			}else if(60 <= Bcycle){
				ptm5.render(renderer);
			}
		        break;
		    case 3:	//接近
			if(Acycle < 100){
				ptm6.render(renderer);
			}else if(100 <= Acycle && Acycle < 200){
				ptm7.render(renderer);
			}else if(200 <= Acycle && Acycle < 250){
				ptm8.render(renderer);
			}else if(250 <= Acycle){
				ptm9.render(renderer);
			}

			if(Ccycle < 16){
				ptm10.render(renderer);
			}else if(16 <= Ccycle){
				ptm11.render(renderer);
			}
		        break;

		    default: ptm12.render(renderer);
		        break;
		}
		GL11.glPopMatrix();
	}
}
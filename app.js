angular.module("oslive", ['ngAnimate'])

.controller('homeController', function($scope){


$scope.free = 32;
$scope.nomeProcesso = ["A","B","C","D","E","F"]
//Definindo processos 
$scope.processos = [];
$scope.processoA = [];
$scope.processoB = [];
$scope.processoC = [];
$scope.processoD = [];
$scope.processoE = [];
$scope.processoF = [];
$scope.processoAtual = null;

$scope.tab_pagA = [];
$scope.tab_pagB = [];
$scope.tab_pagC = [];
$scope.tab_pagD = [];
$scope.tab_pagE = [];
$scope.tab_pagF = [];


//Definindo Memória física para ser alocada
$scope.memoriaF = [
	{status:false,endFisico:"0000", deslocamento:"00",byte:null,cor:"#2E8B57"},
	{status:false,endFisico:"0000", deslocamento:"01",byte:null,cor:"#2E8B57"},
	{status:false,endFisico:"0000", deslocamento:"10",byte:null,cor:"#2E8B57"},
	{status:false,endFisico:"0000", deslocamento:"11",byte:null,cor:"#2E8B57"},
	{status:false,endFisico:"0001", deslocamento:"00",byte:null,cor:"#3CB371"},
	{status:false,endFisico:"0001", deslocamento:"01",byte:null,cor:"#3CB371"},
	{status:false,endFisico:"0001", deslocamento:"10",byte:null,cor:"#3CB371"},
	{status:false,endFisico:"0001", deslocamento:"11",byte:null,cor:"#3CB371"},
	{status:false,endFisico:"0010", deslocamento:"00",byte:null,cor:"#2E8B57"},
	{status:false,endFisico:"0010", deslocamento:"01",byte:null,cor:"#2E8B57"},
	{status:false,endFisico:"0010", deslocamento:"10",byte:null,cor:"#2E8B57"},
	{status:false,endFisico:"0010", deslocamento:"11",byte:null,cor:"#2E8B57"},
	{status:false,endFisico:"0011", deslocamento:"00",byte:null,cor:"#3CB371"},
	{status:false,endFisico:"0011", deslocamento:"01",byte:null,cor:"#3CB371"},
	{status:false,endFisico:"0011", deslocamento:"10",byte:null,cor:"#3CB371"},
	{status:false,endFisico:"0011", deslocamento:"11",byte:null,cor:"#3CB371"},
	{status:false,endFisico:"0100", deslocamento:"00",byte:null,cor:"#2E8B57"},
	{status:false,endFisico:"0100", deslocamento:"01",byte:null,cor:"#2E8B57"},
	{status:false,endFisico:"0100", deslocamento:"10",byte:null,cor:"#2E8B57"},
	{status:false,endFisico:"0100", deslocamento:"11",byte:null,cor:"#2E8B57"},
	{status:false,endFisico:"0101", deslocamento:"00",byte:null,cor:"#3CB371"},
	{status:false,endFisico:"0101", deslocamento:"01",byte:null,cor:"#3CB371"},
	{status:false,endFisico:"0101", deslocamento:"10",byte:null,cor:"#3CB371"},
	{status:false,endFisico:"0101", deslocamento:"11",byte:null,cor:"#3CB371"},
	{status:false,endFisico:"0110", deslocamento:"00",byte:null,cor:"#2E8B57"},
	{status:false,endFisico:"0110", deslocamento:"01",byte:null,cor:"#2E8B57"},
	{status:false,endFisico:"0110", deslocamento:"10",byte:null,cor:"#2E8B57"},
	{status:false,endFisico:"0110", deslocamento:"11",byte:null,cor:"#2E8B57"},
	{status:false,endFisico:"0111", deslocamento:"00",byte:null,cor:"#3CB371"},
	{status:false,endFisico:"0111", deslocamento:"01",byte:null,cor:"#3CB371"},
	{status:false,endFisico:"0111", deslocamento:"10",byte:null,cor:"#3CB371"},
	{status:false,endFisico:"0111", deslocamento:"11",byte:null,cor:"#3CB371"},
	
];


$scope.paginasMF=[
	{cor:"#2E8B57",processo:null,status:true,start:0,end:3},
	{cor:"#3CB371",processo:null,status:true,start:4,end:7},
	{cor:"#2E8B57",processo:null,status:true,start:8,end:11},
	{cor:"#3CB371",processo:null,status:true,start:12,end:15},
	{cor:"#2E8B57",processo:null,status:true,start:16,end:19},
	{cor:"#3CB371",processo:null,status:true,start:20,end:23},
	{cor:"#2E8B57",processo:null,status:true,start:24,end:27},
	{cor:"#3CB371",processo:null,status:true,start:28,end:31},
]

$scope.memoriaF1 = $scope.memoriaF.slice(0,16)
$scope.memoriaF2 = $scope.memoriaF.slice(16,32)

$scope.selecProc = function(nome){
	$scope.selecIdProc = nome;

}

//////////////////////////CADASTAR PROCESSO, CRIA MEMÓRIA LÓGICA E TABELA DE PÁGINAS////////////////
$scope.cadastrar = function(processo){
	var qtdbytelivre = $scope.plivre*4;
	var paginasize = processo.bytes;
	var npaginas = [4,8,12,16]
	$scope.plivre=0; 
	for(p=0; p < $scope.paginasMF.length; p++){
		if($scope.paginasMF[p].status){
			$scope.plivre++;
		}
	}
    
	if(npaginas.includes(paginasize)){
		paginasize = Math.floor(processo.bytes/4);
	}else{
		paginasize = Math.floor(processo.bytes/4)+1;
	}
	
	if(!verificaID(processo.nome) && $scope.plivre >= paginasize && !!processo.nome && !!processo.bytes){
		if(processo.bytes <= 16){
			var cor = $scope.criaPaginas(processo) // CRIA A MEMÓRIA LÓGICA DDO PROCESSO
			$scope.addMemoriaf(processo.nome)      // ADICIONA OS PROCESSO NA MEMÓRIA FÍSICA
			$scope.selecProc(processo.nome)        // SELECIONA O PROCESSO COMO O PADRÃO(TELA PRINCIPAL)
			var p = angular.copy(processo);
			p.status=true;
			p.cor = cor;
			$scope.processos.push(p);
			$scope.limparForm(processo.nome);
			$(".glyphicon-cog").notify("Processo "+processo.nome+" cadastrado!", "success");	
		}else{
			$(".alerta").notify("Tamanho máximo do processo 16 Bytes(4 páginas)", "error",{ position:"top center" });
		}
	} else {
		if($scope.plivre < paginasize ){
			if(processo.bytes > 16){
				$(".glyphicon-cog").notify("Tamanho máximo do processo 16 Bytes(4 páginas)", "error",{ position:"top center" });
				$.notify("Memória insuficiente!\n Existe "+qtdbytelivre+" bytes de memória disponível", "info",{ position:"righ top" });
			}else {
				$.notify("Memória insuficiente!\n Existe "+qtdbytelivre+" bytes de memória disponível", "info",{ position:"righ top" });

			}
		} else if (!processo.nome | !processo.bytes) {
			$(".glyphicon-cog").notify("Preencha todos os campos!", "info");
		}else{
			$(".glyphicon-cog").notify("Processo já existe!", "error");
		}
	}
	var bytesfree=0;
	for(p=0; p < $scope.paginasMF.length; p++){
		if($scope.paginasMF[p].status){
			bytesfree++;
		}
	}
	$scope.free = bytesfree*4;
	console.log("bytes Livre: ", $scope.free)
}


// Cria páginas da memória lógica dos processos
$scope.criaPaginas = function(processo){
	var cor;
	var nByte = 0;
	var paginasize = processo.bytes;
	var npaginas = [4,8,12,16]
	if(npaginas.includes(paginasize)){
		paginasize = Math.floor(processo.bytes/4);
	}else{
		paginasize = Math.floor(processo.bytes/4)+1;
	}
	
	for (var i = 0; i < paginasize; i ++) {
		
		var v_pagina = $scope.criarTabPaginas(i)

		if(processo.nome == "A"){
			cor = "#0780A7";
			for(var j = 0; j < 4; j++){
				if( i ==0){
					if(j == 0){
						var v_pagina = $scope.criarTabPaginas(i,"#0780A7")
						$scope.tab_pagA.push(v_pagina)
					}
					
					var pag = angular.copy(processo);
					pag.endLogico = "0000";
					pag.byte = processo.nome+nByte;
					var bin = "00"+(j).toString(2);
					pag.deslocamento = bin.slice(-2);
					pag.endMF = null; 
					pag.cor = "#0780A7";
				} if( i == 1){
					if(j == 0){
						var v_pagina = $scope.criarTabPaginas(i,"#3aa0d6")
						$scope.tab_pagA.push(v_pagina)
					}
					
					var pag = angular.copy(processo);
					pag.endLogico = "0001";
					pag.byte = processo.nome+nByte;
					var bin = "00"+(j).toString(2);
					pag.deslocamento = bin.slice(-2);
					pag.endMF = null; 
					pag.cor = "#3aa0d6";
				} if( i == 2 ){
					if(j == 0){
						var v_pagina = $scope.criarTabPaginas(i,"#0780A7")
						$scope.tab_pagA.push(v_pagina)
					}
					
					var pag = angular.copy(processo);
					pag.endLogico = "0010";
					pag.byte = processo.nome+nByte;
					var bin = "00"+(j).toString(2);
					pag.deslocamento = bin.slice(-2);
					pag.endMF = null; 
					pag.cor = "#0780A7";
				} if( i == 3 ){
					if(j == 0){
						var v_pagina = $scope.criarTabPaginas(i,"#3aa0d6")
						$scope.tab_pagA.push(v_pagina)
					}
					var pag = angular.copy($scope.processo);
					pag.endLogico = "0011";
					pag.byte = processo.nome+nByte;
					var bin = "00"+(j).toString(2);
					pag.deslocamento = bin.slice(-2);
					pag.endMF = null; 
					pag.cor = "#3aa0d6";
				}
				
				$scope.processoA.push(pag);
				nByte++;

				if(i == paginasize-1 && j == 3){
					var pa = $scope.processoA.length;
					var qtdbyte = processo.bytes;
					for(var p = qtdbyte; p <= pa-1; p++){
						$scope.processoA[p].byte = null;
					}
				}
			}
		
		} if($scope.processo.nome == "B"){
			cor = "#FA9E46";
			for(var j = 0; j < 4; j++){
				if( i ==0){
					if(j == 0){
						var v_pagina = $scope.criarTabPaginas(i,"#FA9E46")
						$scope.tab_pagB.push(v_pagina)
					}
					
					var pag = angular.copy(processo);
					pag.endLogico = "0000";
					pag.byte = processo.nome+nByte;
					var bin = "00"+(j).toString(2);
					pag.deslocamento = bin.slice(-2);
					pag.endMF = null; 
					pag.cor = "#FA9E46";
				} if( i == 1){
					if(j == 0){
						var v_pagina = $scope.criarTabPaginas(i,"#FA8125")
						$scope.tab_pagB.push(v_pagina)
					}
					
					var pag = angular.copy(processo);
					pag.endLogico = "0001";
					pag.byte = processo.nome+nByte;
					var bin = "00"+(j).toString(2);
					pag.deslocamento = bin.slice(-2);
					pag.endMF = null; 
					pag.cor = "#FA8125";
				} if( i == 2 ){
					if(j == 0){
						var v_pagina = $scope.criarTabPaginas(i,"#FA9E46")
						$scope.tab_pagB.push(v_pagina)
					}
					
					var pag = angular.copy(processo);
					pag.endLogico = "0010";
					pag.byte = processo.nome+nByte;
					var bin = "00"+(j).toString(2);
					pag.deslocamento = bin.slice(-2);
					pag.endMF = null; 
					pag.cor = "#FA9E46";
				} if( i == 3 ){
					if(j == 0){
						var v_pagina = $scope.criarTabPaginas(i,"#FA8125")
						$scope.tab_pagB.push(v_pagina)
					}
					
					var pag = angular.copy(processo);
					pag.endLogico = "0011";
					pag.byte = processo.nome+nByte;
					var bin = "00"+(j).toString(2);
					pag.deslocamento = bin.slice(-2);
					pag.endMF = null; 
					pag.cor = "#FA8125";
				}
				
				$scope.processoB.push(pag);
				nByte++;

				

				if(i == paginasize-1 && j == 3){
					var pa = $scope.processoB.length;
					var qtdbyte = processo.bytes;
					for(var p = qtdbyte; p <= pa-1; p++){
						$scope.processoB[p].byte = null;
					}
				}
			}
		} if($scope.processo.nome == "C"){
			cor = "#ab4047";					
			for(var j = 0; j < 4; j++){
				if( i ==0){
					if(j == 0){
						var v_pagina = $scope.criarTabPaginas(i,"#ab4047")
						$scope.tab_pagC.push(v_pagina)
					}
					
					var pag = angular.copy($scope.processo);
					pag.endLogico = "0000";
					pag.byte = processo.nome+nByte;
					var bin = "00"+(j).toString(2);
					pag.deslocamento = bin.slice(-2);
					pag.endMF = null; 
					pag.cor = "#ab4047";
				} if( i == 1){
					if(j == 0){
						var v_pagina = $scope.criarTabPaginas(i,"#bf565c")
						$scope.tab_pagC.push(v_pagina)
					}
					
					var pag = angular.copy(processo);
					pag.endLogico = "0001";
					pag.byte = processo.nome+nByte;
					var bin = "00"+(j).toString(2);
					pag.deslocamento = bin.slice(-2);
					pag.endMF = null; 
					pag.cor = "#bf565c";
				} if( i == 2 ){
					if(j == 0){
						var v_pagina = $scope.criarTabPaginas(i,"#ab4047")
						$scope.tab_pagC.push(v_pagina)
					}
					
					var pag = angular.copy(processo);
					pag.endLogico = "0010";
					pag.byte = processo.nome+nByte;
					var bin = "00"+(j).toString(2);
					pag.deslocamento = bin.slice(-2);
					pag.endMF = null; 
					pag.cor = "#ab4047";
				} if( i == 3 ){
					if(j == 0){
						var v_pagina = $scope.criarTabPaginas(i,"#bf565c")
						$scope.tab_pagC.push(v_pagina)
					}
					var pag = angular.copy($scope.processo);
					pag.endLogico = "0011";
					pag.byte = processo.nome+nByte;
					var bin = "00"+(j).toString(2);
					pag.deslocamento = bin.slice(-2);
					pag.endMF = null; 
					pag.cor = "#bf565c";
				}
				
				$scope.processoC.push(pag);
				nByte++;

				

				if(i == paginasize-1 && j == 3){
					var pa = $scope.processoC.length;
					var qtdbyte =processo.bytes;
					for(var p = qtdbyte; p <= pa-1; p++){
						$scope.processoC[p].byte = null;
					}
				}
			}
		} if($scope.processo.nome == "D"){
			cor = "#4B706A"
			for(var j = 0; j < 4; j++){
				if( i ==0){
					if(j == 0){
						var v_pagina = $scope.criarTabPaginas(i,"#4B706A")
						$scope.tab_pagD.push(v_pagina)
					}
					
					var pag = angular.copy(processo);
					pag.endLogico = "0000";
					pag.byte = processo.nome+nByte;
					var bin = "00"+(j).toString(2);
					pag.deslocamento = bin.slice(-2);
					pag.endMF = null; 
					pag.cor = "#4B706A";
				} if( i == 1){
					if(j == 0){
						var v_pagina = $scope.criarTabPaginas(i,"#61928A")
						$scope.tab_pagD.push(v_pagina)
					}
					var pag = angular.copy(processo);
					pag.endLogico = "0001";
					pag.byte = processo.nome+nByte;
					var bin = "00"+(j).toString(2);
					pag.deslocamento = bin.slice(-2);
					pag.endMF = null; 
					pag.cor = "#61928A";
				} if( i == 2 ){
					if(j == 0){
						var v_pagina = $scope.criarTabPaginas(i,"#4B706A")
						$scope.tab_pagD.push(v_pagina)
					}
					var pag = angular.copy(processo);
					pag.endLogico = "0010";
					pag.byte = processo.nome+nByte;
					var bin = "00"+(j).toString(2);
					pag.deslocamento = bin.slice(-2);
					pag.endMF = null; 
					pag.cor = "#4B706A";
				} if( i == 3 ){
					if(j == 0){
						var v_pagina = $scope.criarTabPaginas(i,"#61928A")
						$scope.tab_pagD.push(v_pagina)
					}
					var pag = angular.copy(processo);
					pag.endLogico = "0011";
					pag.byte = processo.nome+nByte;
					var bin = "00"+(j).toString(2);
					pag.deslocamento = bin.slice(-2);
					pag.endMF = null; 
					pag.cor = "#61928A";
				}
				
				$scope.processoD.push(pag);
				nByte++;

				

				if(i == paginasize-1 && j == 3){
					var pa = $scope.processoD.length;
					var qtdbyte =processo.bytes;
					for(var p = qtdbyte; p <= pa-1; p++){
						$scope.processoD[p].byte = null;
					}
				}
			}
		} if($scope.processo.nome == "E"){
			cor = "#785964"
			for(var j = 0; j < 4; j++){
				if( i ==0){
					if(j == 0){
						var v_pagina = $scope.criarTabPaginas(i,"#785964")
						$scope.tab_pagE.push(v_pagina)
					}
					
					var pag = angular.copy(processo);
					pag.endLogico = "0000";
					pag.byte = processo.nome+nByte;
					var bin = "00"+(j).toString(2);
					pag.deslocamento = bin.slice(-2);
					pag.endMF = null; 
					pag.cor = "#785964";
				} if( i == 1){
					if(j == 0){
						var v_pagina = $scope.criarTabPaginas(i,"#AD8786")
						$scope.tab_pagE.push(v_pagina)
					}
					var pag = angular.copy(processo);
					pag.endLogico = "0001";
					pag.byte = processo.nome+nByte;
					var bin = "00"+(j).toString(2);
					pag.deslocamento = bin.slice(-2);
					pag.endMF = null; 
					pag.cor = "#AD8786";
				} if( i == 2 ){
					if(j == 0){
						var v_pagina = $scope.criarTabPaginas(i,"#785964")
						$scope.tab_pagE.push(v_pagina)
					}
					var pag = angular.copy(processo);
					pag.endLogico = "0010";
					pag.byte = processo.nome+nByte;
					var bin = "00"+(j).toString(2);
					pag.deslocamento = bin.slice(-2);
					pag.endMF = null; 
					pag.cor = "#785964";
				} if( i == 3 ){
					if(j == 0){
						var v_pagina = $scope.criarTabPaginas(i,"#AD8786")
						$scope.tab_pagE.push(v_pagina)
					}
					var pag = angular.copy(processo);
					pag.endLogico = "0011";
					pag.byte = processo.nome+nByte;
					var bin = "00"+(j).toString(2);
					pag.deslocamento = bin.slice(-2);
					pag.endMF = null; 
					pag.cor = "#AD8786";
				}
				
				$scope.processoE.push(pag);
				nByte++;

				

				if(i == paginasize-1 && j == 3){
					var pa = $scope.processoE.length;
					var qtdbyte =processo.bytes;
					for(var p = qtdbyte; p <= pa-1; p++){
						$scope.processoE[p].byte = null;
					}
				}
			}
		} if($scope.processo.nome == "F"){
			cor = "#675B43"
			for(var j = 0; j < 4; j++){
				if( i ==0){
					if(j == 0){
						var v_pagina = $scope.criarTabPaginas(i,"#4E4533")
						$scope.tab_pagF.push(v_pagina)
					}
					
					var pag = angular.copy(processo);
					pag.endLogico = "0000";
					pag.byte = processo.nome+nByte;
					var bin = "00"+(j).toString(2);
					pag.deslocamento = bin.slice(-2);
					pag.endMF = null; 
					pag.cor = "#4E4533";
				} if( i == 1){
					if(j == 0){
						var v_pagina = $scope.criarTabPaginas(i,"#675B43")
						$scope.tab_pagF.push(v_pagina)
					}
					var pag = angular.copy(processo);
					pag.endLogico = "0001";
					pag.byte = processo.nome+nByte;
					var bin = "00"+(j).toString(2);
					pag.deslocamento = bin.slice(-2);
					pag.endMF = null; 
					pag.cor = "#675B43";
				} if( i == 2 ){
					if(j == 0){
						var v_pagina = $scope.criarTabPaginas(i,"#4E4533")
						$scope.tab_pagF.push(v_pagina)
					}
					var pag = angular.copy(processo);
					pag.endLogico = "0010";
					pag.byte = processo.nome+nByte;
					var bin = "00"+(j).toString(2);
					pag.deslocamento = bin.slice(-2);
					pag.endMF = null; 
					pag.cor = "#4E4533";
				} if( i == 3 ){
					if(j == 0){
						var v_pagina = $scope.criarTabPaginas(i,"#675B43")
						$scope.tab_pagF.push(v_pagina)
					}
					var pag = angular.copy(processo);
					pag.endLogico = "0011";
					pag.byte = processo.nome+nByte;
					var bin = "00"+(j).toString(2);
					pag.deslocamento = bin.slice(-2);
					pag.endMF = null; 
					pag.cor = "#675B43";
				}
				
				$scope.processoF.push(pag);
				nByte++;

				

				if(i == paginasize-1 && j == 3){
					var pa = $scope.processoF.length;
					var qtdbyte =processo.bytes;
					for(var p = qtdbyte; p <= pa-1; p++){
						$scope.processoF[p].byte = null;
					}
				}
			}
		}
	} 
	return cor;
}

//criar tabela de páginas para o processo
$scope.criarTabPaginas = function(pagina,cor){
	var aux = new Object();
	var bin = "000"+(pagina).toString(2);
	aux.endLogico = bin.slice(-4);
	aux.endFisico = null;
	aux.cor = cor;
	return aux;
}

// limprar formulário de criação dos processos
$scope.limparForm = function(nome){
	$scope.processo.nome="";
	$scope.processo.bytes=null;
	var indice = $scope.nomeProcesso.indexOf(nome)
	$scope.nomeProcesso.splice(indice,1)
}

// função para exibição do tooltip
$(document).ready(function(){
    $('[data-toggle=tooltip]').hover(function(){
		// on mouseenter
		$(this).tooltip('show');
    }, function(){
		// on mouseleave
        $(this).tooltip('hide');
    });
});

$scope.limparListProcessos = function(){
	var processosSize = $scope.processos.length;
	for (var i = 0; i < processosSize; i ++) {
		$scope.processos.shift();
	}
}

$scope.geradorAleatorio = function(){
	$scope.proc = {};
	listNomes = ["A", "B", "C", "D"];
	for (var i = 0; i < 4; i++) {
		$scope.proc.nome = listNomes[i];
		$scope.proc.bytes = Math.round(Math.random() * 15) + 1;
		$scope.proc.cor = gera_cor();
		var procfim = angular.copy($scope.proc);
		$scope.processos.push(procfim);
		$scope.criaPaginas($scope.processos[i])
		
		
	}
}



//Procurar página livre na Memória Física
$scope.verificaMFlivre =  function(){
	for (p = 0; p < $scope.paginasMF.length; p++ ){
		if( $scope.paginasMF[p].status){
			return p;
			break;
		}
	}
}

// Adicionar paginas na memória física
$scope.addMemoriaf = function(index){
	$scope.selecIdProc = index;
	

	if(index === 'A'){
		console.log("Ver campo byte ", $scope.processoA)
		var qtdA = $scope.processoA.length/4;
		if(qtdA <= $scope.plivre){
			var pos = 0;
			for(i=0; i < qtdA; i++){
				var indice = $scope.verificaMFlivre()
				console.log("indice", indice)
				if($scope.paginasMF[indice].status){
					var start = $scope.paginasMF[indice].start;
					console.log("start",start);
					$scope.tab_pagA[i].endFisico = $scope.memoriaF[start].endFisico;
					for(b=0; b <4 ;b++){
						$scope.memoriaF[start].status = false;
						$scope.memoriaF[start].cor = $scope.processoA[pos+b].cor;
						if($scope.processoA[pos+b].byte == null){
							$scope.memoriaF[start].byte = "SOBRA"
						}else{
							$scope.memoriaF[start].byte = $scope.processoA[pos+b].byte;
						}
						start++;
					}
					pos = pos+4
				}
				$scope.paginasMF[indice].status = false;
				$scope.paginasMF[indice].processo = "A";

			}
		}else{	
			$(".nav-tabs").notify("Memória insuficiente para o processo "+ index +" !", "warn");
		}
	}

	if(index === 'B'){
		var qtdB = $scope.processoB.length/4;
		if(qtdB <= $scope.plivre){
			var pos = 0;
			for(i=0; i < qtdB; i++){
				var indice = $scope.verificaMFlivre()
				if($scope.paginasMF[indice].status){
					var start = $scope.paginasMF[indice].start;
					console.log("start",start,$scope.tab_pagB,$scope.memoriaF[start].endFisico);
					$scope.tab_pagB[i].endFisico = $scope.memoriaF[start].endFisico;
					for(b=0; b <4 ;b++){
						$scope.memoriaF[start].status = false;
						$scope.memoriaF[start].cor = $scope.processoB[pos+b].cor;
						if($scope.processoB[pos+b].byte == null){
							$scope.memoriaF[start].byte = "SOBRA"
						}else{
							$scope.memoriaF[start].byte = $scope.processoB[pos+b].byte;
						}
						start++;
					}
					pos = pos+4
				}
				$scope.paginasMF[indice].status = false;
				$scope.paginasMF[indice].processo = "B";

			}
		}else{	
			$(".nav-tabs").notify("Memória insuficiente para o processo "+ index +" !", "warn");
		}
	}

	if(index === 'C'){
		var qtdC = $scope.processoC.length/4;
		if(qtdC <= $scope.plivre){
			var pos = 0;
			for(i=0; i < qtdC; i++){
				var indice = $scope.verificaMFlivre()
				if($scope.paginasMF[indice].status){
					var start = $scope.paginasMF[indice].start;
					$scope.tab_pagC[i].endFisico = $scope.memoriaF[start].endFisico;
					for(b=0; b <4 ;b++){
						$scope.memoriaF[start].status = false;
						$scope.memoriaF[start].cor = $scope.processoC[pos+b].cor;
						if($scope.processoC[pos+b].byte == null){
							$scope.memoriaF[start].byte = "SOBRA"
						}else{
							$scope.memoriaF[start].byte = $scope.processoC[pos+b].byte;
						}
						start++;
					}
					pos = pos+4
				}
				$scope.paginasMF[indice].status = false;
				$scope.paginasMF[indice].processo = "C";

			}
		}else{	
			$(".nav-tabs").notify("Memória insuficiente para o processo "+ index +" !", "warn");
		}
	}

	if(index === 'D'){
		var qtdD = $scope.processoD.length/4;
		if(qtdD <= $scope.plivre){
			var pos = 0;
			for(i=0; i < qtdD; i++){
				var indice = $scope.verificaMFlivre()
				if($scope.paginasMF[indice].status){
					var start = $scope.paginasMF[indice].start;
					$scope.tab_pagD[i].endFisico = $scope.memoriaF[start].endFisico;
					for(b=0; b <4 ;b++){
						$scope.memoriaF[start].status = false;
						$scope.memoriaF[start].cor = $scope.processoD[pos+b].cor;
						if($scope.processoD[pos+b].byte == null){
							$scope.memoriaF[start].byte = "SOBRA"
						}else{
							$scope.memoriaF[start].byte = $scope.processoD[pos+b].byte;
						}
						start++;
					}
					pos = pos+4
				}
				$scope.paginasMF[indice].status = false;
				$scope.paginasMF[indice].processo = "D";

			}
		}else{	
			$(".nav-tabs").notify("Memória insuficiente para o processo "+ index +" !", "warn");
		}
	}
	if(index === 'E'){
		var qtdD = $scope.processoE.length/4;
		if(qtdD <= $scope.plivre){
			var pos = 0;
			for(i=0; i < qtdD; i++){
				var indice = $scope.verificaMFlivre()
				if($scope.paginasMF[indice].status){
					var start = $scope.paginasMF[indice].start;
					$scope.tab_pagE[i].endFisico = $scope.memoriaF[start].endFisico;
					for(b=0; b <4 ;b++){
						$scope.memoriaF[start].status = false;
						$scope.memoriaF[start].cor = $scope.processoE[pos+b].cor;
						if($scope.processoE[pos+b].byte == null){
							$scope.memoriaF[start].byte = "SOBRA"
						}else{
							$scope.memoriaF[start].byte = $scope.processoE[pos+b].byte;
						}
						start++;
					}
					pos = pos+4
				}
				$scope.paginasMF[indice].status = false;
				$scope.paginasMF[indice].processo = "E";

			}
		}else{	
			$(".nav-tabs").notify("Memória insuficiente para o processo "+ index +" !", "warn");
		}
	}
	if(index === 'F'){
		var qtdD = $scope.processoF.length/4;
		if(qtdD <= $scope.plivre){
			var pos = 0;
			for(i=0; i < qtdD; i++){
				var indice = $scope.verificaMFlivre()
				if($scope.paginasMF[indice].status){
					var start = $scope.paginasMF[indice].start;
					$scope.tab_pagF[i].endFisico = $scope.memoriaF[start].endFisico;
					for(b=0; b <4 ;b++){
						$scope.memoriaF[start].status = false;
						$scope.memoriaF[start].cor = $scope.processoF[pos+b].cor;
						if($scope.processoF[pos+b].byte == null){
							$scope.memoriaF[start].byte = "SOBRA"
						}else{
							$scope.memoriaF[start].byte = $scope.processoF[pos+b].byte;
						}
						start++;
					}
					pos = pos+4
				}
				$scope.paginasMF[indice].status = false;
				$scope.paginasMF[indice].processo = "F";

			}
		}else{	
			$(".nav-tabs").notify("Memória insuficiente para o processo "+ index +" !", "warn");
		}
	}
};



// Excluir processo
$scope.rmMemoriaf = function(index,obj){
	var aux = 0;
	var procnome = obj.nome;
	var posicao = $scope.processos.indexOf(obj);
	for(i = 0; i< $scope.paginasMF.length; i++){
		if($scope.paginasMF[i].processo == index){
			var start = $scope.paginasMF[i].start;
			var end = $scope.paginasMF[i].end;
			var cor = $scope.paginasMF[i].cor;
			for(j = start; j <= end; j++){
				$scope.memoriaF[j].cor=cor;
				$scope.memoriaF[j].byte=null;
			};
			$scope.paginasMF[i].processo = null;
			$scope.paginasMF[i].status = true;

			if(index == "A"){
				$scope.tab_pagA = [];
				$scope.processoA =[];
				

			}else if(index == "B"){
				$scope.tab_pagB = [];
				$scope.processoB =[];
				

			}else if(index == "C"){
				$scope.tab_pagC = [];
				$scope.processoC =[];
				
			}else if(index == "D"){
				$scope.tab_pagD = [];
				$scope.processoD =[];
				
			}else if(index == "E"){
				$scope.tab_pagE = [];
				$scope.processoE =[];
				
			}else{
				$scope.tab_pagF = [];
				$scope.processoF =[];
				

			}
			aux++;

		}
	}

$scope.nomeProcesso.push(procnome);
$scope.nomeProcesso.sort();

var nome = $scope.processos[posicao].nome 
$scope.processos.splice(posicao,1);

console.log("Quem é: ", $scope.selecIdProc)
if ($scope.processos.length > 0 && nome == $scope.selecIdProc ){
	$scope.selecProc($scope.processos[0].nome)

}



}

// Verifica se o processo já existe
function verificaID(nome){			
	for(var i=0; i< $scope.processos.length; i++){
		if($scope.processos[i].nome == nome){
			return true;
		}
	}
	return false;
}


});

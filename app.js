
angular.module("oslive", ['ngAnimate'])

.controller('homeController', function($scope){


var carga = 1000;
var cont = 100
var pc, cpu, pagina, time;
var indiceLivreMF = 0;
$scope.free = 32;

//Definindo processos 
$scope.processos = [];
$scope.processoA = [];
$scope.processoB = [];
$scope.processoC = [];
$scope.processoD = [];
$scope.processoAtual = null;

$scope.tab_pagA = [];
$scope.tab_pagB = [];
$scope.tab_pagC = [];
$scope.tab_pagD = [];

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



//info é o valor da primeira posição do select "Selecione o Algoritmo de escalonamento"
$scope.escalonador = "FIFO"
$scope.listaFIFO=[];

$scope.selecProc = function(nome){
	$scope.selecIdProc = nome;

}

//////////////////////////CADASTAR PROCESSO E CRIAR MEMÓRIA LÓGICA E TABELA DE PÁGINAS////////////////
$scope.cadastrar = function(processo){
	$scope.plivre=0; 
	console.log("nome: ",processo.nome," bytes: ",processo.bytes)
	console.log("teste de retorno nome: ",!!processo.nome)	
	console.log("teste de retorno bytes: ",!!processo.bytes)

	for(p=0; p < $scope.paginasMF.length; p++){
		if($scope.paginasMF[p].status){
			$scope.plivre++;
		}
	}
    var qtdbytelivre = $scope.plivre*4;
	var paginasize = processo.bytes;
	var npaginas = [4,8,12,16]
	if(npaginas.includes(paginasize)){
		paginasize = Math.floor(processo.bytes/4);
	}else{
		paginasize = Math.floor(processo.bytes/4)+1;
	}
	
	if(!verificaID(processo.nome) && $scope.plivre >= paginasize && !!processo.nome && !!processo.bytes){
		if(processo.bytes <= 16){
			$scope.criaPaginas(processo)
			$scope.addMemoriaf(processo.nome)
			var p = angular.copy(processo);
			$scope.selecProc(processo.nome)
			p.status=true;
			$scope.processos.push(p);
			$scope.limparForm();
			$(".glyphicon-cog").notify("Processo cadastrado!", "success");	
		}else{
			$(".glyphicon-cog").notify("Tamanho máximo do processo 16 bytes", "warn");
		}
	} else {
		if($scope.plivre < paginasize ){
			$.notify("Memória insuficiente!\n Existe "+qtdbytelivre+" bytes de memória livre", "info",{ position:"righ top" });
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


$scope.criaPaginas = function(processo){
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
			for(var j = 0; j < 4; j++){
				if( i ==0){
					if(j == 0){
						var v_pagina = $scope.criarTabPaginas(i,"#084f75")
						$scope.tab_pagA.push(v_pagina)
					}
					
					var pag = angular.copy(processo);
					pag.endLogico = "0000";
					pag.byte = processo.nome+nByte;
					var bin = "00"+(j).toString(2);
					pag.deslocamento = bin.slice(-2);
					pag.endMF = null; 
					pag.cor = "#084f75";
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
						var v_pagina = $scope.criarTabPaginas(i,"#084f75")
						$scope.tab_pagA.push(v_pagina)
					}
					
					var pag = angular.copy(processo);
					pag.endLogico = "0010";
					pag.byte = processo.nome+nByte;
					var bin = "00"+(j).toString(2);
					pag.deslocamento = bin.slice(-2);
					pag.endMF = null; 
					pag.cor = "#084f75";
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
			for(var j = 0; j < 4; j++){
				if( i ==0){
					if(j == 0){
						var v_pagina = $scope.criarTabPaginas(i,"#2F4F4F")
						$scope.tab_pagB.push(v_pagina)
					}
					
					var pag = angular.copy(processo);
					pag.endLogico = "0000";
					pag.byte = processo.nome+nByte;
					var bin = "00"+(j).toString(2);
					pag.deslocamento = bin.slice(-2);
					pag.endMF = null; 
					pag.cor = "#2F4F4F";
				} if( i == 1){
					if(j == 0){
						var v_pagina = $scope.criarTabPaginas(i,"#008B8B")
						$scope.tab_pagB.push(v_pagina)
					}
					
					var pag = angular.copy(processo);
					pag.endLogico = "0001";
					pag.byte = processo.nome+nByte;
					var bin = "00"+(j).toString(2);
					pag.deslocamento = bin.slice(-2);
					pag.endMF = null; 
					pag.cor = "#008B8B";
				} if( i == 2 ){
					if(j == 0){
						var v_pagina = $scope.criarTabPaginas(i,"#2F4F4F")
						$scope.tab_pagB.push(v_pagina)
					}
					
					var pag = angular.copy(processo);
					pag.endLogico = "0010";
					pag.byte = processo.nome+nByte;
					var bin = "00"+(j).toString(2);
					pag.deslocamento = bin.slice(-2);
					pag.endMF = null; 
					pag.cor = "#2F4F4F";
				} if( i == 3 ){
					if(j == 0){
						var v_pagina = $scope.criarTabPaginas(i,"#008B8B")
						$scope.tab_pagB.push(v_pagina)
					}
					
					var pag = angular.copy(processo);
					pag.endLogico = "0011";
					pag.byte = processo.nome+nByte;
					var bin = "00"+(j).toString(2);
					pag.deslocamento = bin.slice(-2);
					pag.endMF = null; 
					pag.cor = "#008B8B";
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
					
			for(var j = 0; j < 4; j++){
				if( i ==0){
					if(j == 0){
						var v_pagina = $scope.criarTabPaginas(i,"#761c19")
						$scope.tab_pagC.push(v_pagina)
					}
					
					var pag = angular.copy($scope.processo);
					pag.endLogico = "0000";
					pag.byte = processo.nome+nByte;
					var bin = "00"+(j).toString(2);
					pag.deslocamento = bin.slice(-2);
					pag.endMF = null; 
					pag.cor = "#761c19";
				} if( i == 1){
					if(j == 0){
						var v_pagina = $scope.criarTabPaginas(i,"#db3e39")
						$scope.tab_pagC.push(v_pagina)
					}
					
					var pag = angular.copy(processo);
					pag.endLogico = "0001";
					pag.byte = processo.nome+nByte;
					var bin = "00"+(j).toString(2);
					pag.deslocamento = bin.slice(-2);
					pag.endMF = null; 
					pag.cor = "#db3e39";
				} if( i == 2 ){
					if(j == 0){
						var v_pagina = $scope.criarTabPaginas(i,"#761c19")
						$scope.tab_pagC.push(v_pagina)
					}
					
					var pag = angular.copy(processo);
					pag.endLogico = "0010";
					pag.byte = processo.nome+nByte;
					var bin = "00"+(j).toString(2);
					pag.deslocamento = bin.slice(-2);
					pag.endMF = null; 
					pag.cor = "#761c19";
				} if( i == 3 ){
					if(j == 0){
						var v_pagina = $scope.criarTabPaginas(i,"#db3e39")
						$scope.tab_pagC.push(v_pagina)
					}
					var pag = angular.copy($scope.processo);
					pag.endLogico = "0011";
					pag.byte = processo.nome+nByte;
					var bin = "00"+(j).toString(2);
					pag.deslocamento = bin.slice(-2);
					pag.endMF = null; 
					pag.cor = "#db3e39";
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
			for(var j = 0; j < 4; j++){
				if( i ==0){
					if(j == 0){
						var v_pagina = $scope.criarTabPaginas(i,"#988CD1")
						$scope.tab_pagD.push(v_pagina)
					}
					
					var pag = angular.copy(processo);
					pag.endLogico = "0000";
					pag.byte = processo.nome+nByte;
					var bin = "00"+(j).toString(2);
					pag.deslocamento = bin.slice(-2);
					pag.endMF = null; 
					pag.cor = "#988CD1";
				} if( i == 1){
					if(j == 0){
						var v_pagina = $scope.criarTabPaginas(i,"#526eb5")
						$scope.tab_pagD.push(v_pagina)
					}
					var pag = angular.copy(processo);
					pag.endLogico = "0001";
					pag.byte = processo.nome+nByte;
					var bin = "00"+(j).toString(2);
					pag.deslocamento = bin.slice(-2);
					pag.endMF = null; 
					pag.cor = "#526eb5";
				} if( i == 2 ){
					if(j == 0){
						var v_pagina = $scope.criarTabPaginas(i,"#988CD1")
						$scope.tab_pagD.push(v_pagina)
					}
					var pag = angular.copy(processo);
					pag.endLogico = "0010";
					pag.byte = processo.nome+nByte;
					var bin = "00"+(j).toString(2);
					pag.deslocamento = bin.slice(-2);
					pag.endMF = null; 
					pag.cor = "#988CD1";
				} if( i == 3 ){
					if(j == 0){
						var v_pagina = $scope.criarTabPaginas(i,"#526eb5")
						$scope.tab_pagD.push(v_pagina)
					}
					var pag = angular.copy(processo);
					pag.endLogico = "0011";
					pag.byte = processo.nome+nByte;
					var bin = "00"+(j).toString(2);
					pag.deslocamento = bin.slice(-2);
					pag.endMF = null; 
					pag.cor = "#526eb5";
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
		}
	} 
}


$scope.criarTabPaginas = function(pagina,cor){
	var aux = new Object();
	var bin = "000"+(pagina).toString(2);
	aux.endLogico = bin.slice(-4);
	aux.endFisico = null;
	aux.cor = cor;
	return aux;
}

$scope.carregarPagina = function(processo){
	
	if(!verificaPagina(processo.nome)){
		for (var i = 0; i < $scope.memoriaF.length; i ++) {
			if($scope.memoriaF[i].nome != null){
				if($scope.memoriaF[i].horaCarga < carga){
					carga = $scope.memoriaF[i].horaCarga;
					pagina =  i;
					
				}else if(i == 7){
					$scope.listaFIFO[$scope.listaFIFO.length -1].cor = "#f07605";
					
					$scope.listaFIFO.pop();
					$scope.memoriaF[pagina].nome = processo.nome;
					$scope.memoriaF[pagina].cor = processo.cor;
					$scope.memoriaF[pagina].horaCarga = cont;
					$scope.memoriaF[pagina].processoL.bit = "i";
					$scope.memoriaF[pagina].processoL.endMF = null;
					$scope.memoriaF[pagina].processoL.cort = "#fff";
					$scope.listaFIFO.unshift($scope.memoriaF[pagina])


					processo.cort = processo.cor;
					processo.bit = "V";
					processo.endMF = $scope.memoriaF[pagina].paginaf;
					$scope.memoriaF[pagina].processoL = processo;
					cont ++;
					carga = 1000;
				}
				
			} else if ($scope.memoriaF[i].nome == null) {
				
				$scope.memoriaF[i].nome = processo.nome;
				$scope.memoriaF[i].cor = processo.cor;
				$scope.memoriaF[i].horaCarga = cont;
				$scope.memoriaF[i].processoL = processo;
				$scope.listaFIFO.unshift($scope.memoriaF[i])
				processo.cort = processo.cor;
				processo.bit = "V";
				processo.endMF = $scope.memoriaF[i].paginaf;
				cont ++;
				$(".glyphicon-cog").notify("Página "+ processo.nome +" carregada na memória física!" , "success");
				break;
			}
		}
	} else{
		$(".glyphicon-cog").notify("Página "+ processo.nome +" Já está na memória!", "error");
	}
}


$scope.limparForm = function(){
	$scope.processo.nome="";
	$scope.processo.bytes=null;
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

// cria fila de aptos
$scope.aptos = function(list) {
	var aux, count = null;
	$scope.filaAptos = [];
	$scope.filaDelay = [];
	list.forEach(function(processo, i){
		if (i != 0) count ++;
		if (processo.nome != aux && processo.nome != "-") {
			aux = processo.nome;
			p = angular.copy(processo);
			p.count = count;
			$scope.filaAptos.push(p);
			$scope.filaDelay.push(count);
		}
	});
}


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
						$scope.memoriaF[start].byte = $scope.processoA[pos+b].byte;
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
						$scope.memoriaF[start].byte = $scope.processoB[pos+b].byte;
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
						$scope.memoriaF[start].byte = $scope.processoC[pos+b].byte;
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
						$scope.memoriaF[start].byte = $scope.processoD[pos+b].byte;
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

	
	console.log("Pag. Memoria F:", $scope.paginasMF)
};



// Remover paginas na memória física
$scope.rmMemoriaf = function(index,obj){
	var aux = 0;
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
				
			}else{
				$scope.tab_pagD = [];
				$scope.processoD =[];
				

			}
			aux++;

		}
	}
$scope.processos.splice(posicao,1);
if ($scope.processos.length > 0){
	$scope.selecProc($scope.processos[0].nome)

}


}


//cria-se uma copia do objeto a ser editado e seta a copia no scope.processo
$scope.editar = function(processo){
	$scope.aleatorio = false;
	var copia = angular.copy(processo);
	$scope.processo = copia;
	$scope.processo.edit = true;
}

$scope.simular = function(){
var algoritmo = $scope.escalonador;
$scope.resultados;
$scope.resultados2;
$scope.mediaEspera;
$scope.mediaTurn;

	var lista = validar();
	pc = new PC (lista);
	cpu = new CPU ();

	if(algoritmo!=null && algoritmo!="info"){
		if(lista.length != 0){
			
			if(algoritmo == "FIFO"){
				$scope.resultados = simulandoFIFO();
				$scope.resultados2 = pc.tabelaResultado();
				drawChart($scope.resultados2);
				$.notify("Escalonamento FIFO!", "success");
			}

		}
		else{
			$(".glyphicon-cog").notify("Adicione os Processos!", {
				position:"right" });
		}

	} 
	else{
		$(".glyphicon-cog").notify("Selecione o algoritmo!", {
			position:"right" });
	}
	$scope.aptos($scope.resultados);
}


function simulandoFIFO(){
	var escalonar = new FIFO(); 
	var resultado = []; 
	var status = new Array();
	var aux;

	time =0;  

	while(!pc.vazio() || !escalonar.vazio() || cpu.ocupado){   
		aux = pc.processosPorTempo(time);
		
		while(aux.length >0){
			escalonar.addProcesso(aux.shift()); 
		}

		if(!cpu.ocupado && !escalonar.vazio()){  
			cpu.alocaProcesso(escalonar.escolherProcesso());
		}

		if(cpu.ocupado){ 
			aux = cpu.act();
			if(!cpu.ocupado)  
				pc.addfinalizado(aux); 
		}
		else
			aux = null;

		escalonar.addTEspera(1);  

		if(aux != null) 
			resultado.push({nome:aux.nome, cor: aux.cor});
		else 
			resultado.push({nome:"-", cor: "#FFFFFF"}); 

		time++;
	}

	for(var i=0; i< resultado.length; i++){
		status.push({tempo:i, nome:resultado[i].nome, cor: resultado[i].cor});
	}
	return status;
}


function validar(){		//verifica se o primeiro processo inicializa com zero
	var pro = new Array();

	for(var i=0; i< $scope.processos.length; i++){
		if($scope.processos[0].pagina != 0 ){
			var cor = gera_cor();
			pro.push(new Processo($scope.processos[i].nome, $scope.processos[i].pagina, $scope.processos[i].cor));
		}
	}
	return pro;
}


function verificaID(nome){			// Verifica se o processo já existe
	for(var i=0; i< $scope.processos.length; i++){
		if($scope.processos[i].nome == nome){
			return true;
		}
	}
	return false;
}

function verificaPagina(nome){			// Verifica se a página já está na memória física
	for(var i=0; i< $scope.memoriaF.length; i++){
		if($scope.memoriaF[i].nome == nome){
			return true;
		}
	}
	return false;
}

function gera_cor(){		// gera cor aleatoria
    var hexadecimais = '0123456789ABCDEF';
    var cor = '#';
    // Pega um número aleatório no array acima
    for (var i = 0; i < 6; i++ ) {
    //E concatena à variável cor
        cor += hexadecimais[Math.floor(Math.random() * 16)];
    }
    return cor;
}

});

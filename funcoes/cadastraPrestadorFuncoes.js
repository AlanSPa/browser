import { conferePreenchimento,  preencherInput, } from './genericas.js'



//ACESSO A TELA CAD_PRE
export async function acessarCAD_PRE(page) {

  await page.screenshot({ path: `consultanaATEURG/loginIT${__ITER}-VU${__VU}.png` });

  const menuIcon = page.locator('//i[@class="mv-basico-menu dp32"]');
  await menuIcon.click();
  let AcessoTela = page.locator('//a[@title="Serviços de Apoio"]');
  await AcessoTela.click();
  AcessoTela = page.locator('//a[@title="Diretoria Clinica"]');
  await AcessoTela.click();
  AcessoTela = page.locator('//a[@title="Tabelas"]');
  await AcessoTela.click();
  AcessoTela = page.locator('//a[@title="Prestadores"]');
  await AcessoTela.click();
  AcessoTela = page.locator('//a[@title="Cadastro: Prestadores (Std)"]');
  await AcessoTela.waitFor({ state: 'visible', timeout: 1000000 });
  

  await page.screenshot({ path: `CAD_PRE/telaIT${__ITER}-VU${__VU}.png` });
}

//CADASTRO OBRIGATORIO
export async function cadastroPrimario(page, nome, guerra, cpf, tp_prestador){


  // NOME
  let InputTela = await targetFrame.locator('//input[@id="inp:nmPrestador"]');
  await preencherInput(page, InputTela, nome);
  await page.screenshot({ path: `CAD_PRE/NOME-VU${__VU}.png` });

  // GUERRA
  let InputGuerra = await targetFrame.locator('//input[@id="inp:nmMnemonico"]');
  await preencherInput(page, InputGuerra, guerra);
  await page.screenshot({ path: `CAD_PRE/GUERRA-VU${__VU}.png` });

  // CPF
  console.log('CPF gerado:', cpf); 
  let InputCpf = await targetFrame.locator('//input[@id="inp:nrCpfCgc"]');
  await InputCpf.waitFor({ state: 'visible', timeout: 60000 });
  await InputCpf.click();
  await page.waitForTimeout(1000);
  await InputCpf.type(cpf);
  await InputCpf.press('Tab');

  await page.screenshot({ path: `CAD_PRE/CPF-VU${__VU}.png` });

  //ABA COMPLEMENTO
  let AbaComplemento = targetFrame.locator('//li[@aria-controls="TAB_CANVAS-TAB_DADOS_PRESTADOR"]');
  await AbaComplemento.waitFor({ state: 'visible', timeout: 10000 });
  await AbaComplemento.click();
  await AbaComplemento.click();
  await page.waitForTimeout(1000); 

  await page.screenshot({ path: `CAD_PRE/ABACOMPLEMENTO-VU${__VU}.png` });


  let InputTip = targetFrame.locator('//input[@id="inp:cdTipPresta"]');
  await preencherInput(page, InputTip, tp_prestador);
  //await conferePreenchimento(page, InputTip, tp_prestador)
  await page.screenshot({ path: `CAD_PRE/TIP_PREST-VU${__VU}.png` });



}



//CADASTRAR PRESTADOR
export async function cadastraPrestador(page, targetFrame, nome, mae, pai, nascimento, sexo, cor, cpf, rg, emissor, uf, dtExped) {

  //await page.waitForTimeout(9000);
  // Nome do Prestador
  let InputTela = await targetFrame.locator('//input[@id="inp:nmPrestador"]');
  await preencherInput(page, InputTela, nome);
  await InputTela.press('Tab');
  //await conferePreenchimento(page, InputTela, nome)
  await page.screenshot({ path: `CAD_PRE/prestador${__ITER}-VU${__VU}.png` });

  // Sexo
  let InputSexo = await targetFrame.locator('//input[@id="TAB_PRESTADOR_tpSexo_ac"]');
  await InputSexo.waitFor({ state: 'visible', timeout: 600000 });
  await InputSexo.click();
  await page.waitForTimeout(1000);
  await InputSexo.fill(sexo);
  await page.waitForTimeout(1000);
  await InputSexo.press('Tab');
  //await conferePreenchimento(page, InputSexo, sexo)

  await page.screenshot({ path: `CAD_PRE/sexo${__ITER}-VU${__VU}.png` });

// Cor
  let InputCor = await targetFrame.locator('//input[@id="TAB_PRESTADOR_tpCor_ac"]');
  await InputCor.waitFor({ state: 'visible', timeout: 60000 });
  await InputCor.click();
  await page.waitForTimeout(1000);
  await InputCor.fill(cor);
  await InputCor.press('Tab');
  await page.waitForTimeout(1000);
  //await conferePreenchimento(page, InputCor, cor)


  await page.screenshot({ path: `CAD_PRE/cor${__ITER}-VU${__VU}.png` });

// Nome de Guerra
  let InputGuerra = await targetFrame.locator('//input[@id="inp:nmMnemonico"]');
  await InputGuerra.waitFor({ state: 'visible', timeout: 60000 });
  await InputGuerra.click(); 
  await page.waitForTimeout(1000); 
  await InputGuerra.fill(nome);
  await InputGuerra.press('Tab');
  //await conferePreenchimento(page, InputGuerra, nome)

  await page.screenshot({ path: `CAD_PRE/guerra${__ITER}-VU${__VU}.png` });

  
  // Data de nascimento
  let InputDtNascimento = await targetFrame.locator('//input[@id="inp:dtNascimento"]');
  await InputDtNascimento.waitFor({ state: 'visible', timeout: 60000 });
  await InputDtNascimento.click(); 
  await InputDtNascimento.fill(nascimento);
  await page.waitForTimeout(1000);
  await InputDtNascimento.press('Tab');

  await page.screenshot({ path: `CAD_PRE/dtnascimento${__ITER}-VU${__VU}.png` });

  // CPF
  console.log('CPF gerado:', cpf); 
  let InputCpf = await targetFrame.locator('//input[@id="inp:nrCpfCgc"]');
  await InputCpf.waitFor({ state: 'visible', timeout: 60000 });
  await InputCpf.click();
  await page.waitForTimeout(1000);
  await InputCpf.fill(cpf);
  await InputCpf.press('Tab');

  await page.screenshot({ path: `CAD_PRE/cpf${__ITER}-VU${__VU}.png` });

  // IDENTIDADE
  console.log('RG gerado:', rg); 
  let InputRG = await targetFrame.locator('//input[@id="inp:nrDocumento"]');
  await InputRG.waitFor({ state: 'visible', timeout: 60000 });
  await InputRG.click();
  await page.waitForTimeout(1000);
  await InputRG.fill(rg);
  await InputRG.press('Tab');

  await page.screenshot({ path: `CAD_PRE/rg${__ITER}-VU${__VU}.png` });

  // EMISSOR

  let InputEmissor = await targetFrame.locator('//input[@id="inp:dsOmIdentidade"]');
  await InputEmissor.waitFor({ state: 'visible', timeout: 60000 });
  await InputEmissor.click();
  await page.waitForTimeout(1000);
  await InputEmissor.fill(emissor);
  await InputEmissor.press('Tab');

  await page.screenshot({ path: `CAD_PRE/emissor${__ITER}-VU${__VU}.png` });

  // UF

  let InputUF = await targetFrame.locator('//input[@id="inp:CdUfOrgaoEmissor"]');
  await InputUF.waitFor({ state: 'visible', timeout: 60000 });
  await InputUF.click();
  await page.waitForTimeout(1000);
  await InputUF.fill(uf);
  await InputUF.press('Tab');

  await page.screenshot({ path: `CAD_PRE/uf${__ITER}-VU${__VU}.png` });

  // DtExped
  let InputDtE = await targetFrame.locator('//input[@id="inp:dtExpedicaoOrgaoEmissor"]');
  await preencherInput(page, InputDtE, dtExped)
  await InputDtE.press('Tab');

  await page.screenshot({ path: `CAD_PRE/dte${__ITER}-VU${__VU}.png` });

  

  // Nome da mãe
  let InputMae = await targetFrame.locator('//input[@id="inp:nmMae"]');
  await preencherInput(page, InputMae, mae);
  await InputMae.press('Tab');
  //await conferePreenchimento(page, InputMae, mae)
  await page.waitForTimeout(1000);

  await page.screenshot({ path: `CAD_PRE/mae${__ITER}-VU${__VU}.png` });

  // Nome do Pai
  let InputPai = await targetFrame.locator('//input[@id="inp:nmPai"]');
  await preencherInput(page, InputPai, pai);
  await InputPai.press('Tab');
  //await conferePreenchimento(page, InputPai, pai)

  await page.screenshot({ path: `CAD_PRE/pai${__ITER}-VU${__VU}.png` });



}

//PREENCHER COMPLEMENTOS

export async function cadastraComplemento(page, targetFrame, tp_prestador, chefe, Ccm, Email, Conselho) {

  let AbaComplemento = targetFrame.locator('//li[@aria-controls="TAB_CANVAS-TAB_DADOS_PRESTADOR"]');
  await AbaComplemento.waitFor({ state: 'visible', timeout: 100000 });
  await AbaComplemento.click();
  await AbaComplemento.click();
  await page.waitForTimeout(1000); 

  await page.screenshot({ path: `CAD_PRE/abaComplemento${__ITER}-VU${__VU}.png` });


  let InputTela = targetFrame.locator('//input[@id="inp:cdTipPresta"]');
  await preencherInput(page, InputTela, tp_prestador);
  await InputTela.press('Tab');
  //await conferePreenchimento(page, InputTela, tp_prestador)

  await page.screenshot({ path: `CAD_PRE/tipPre${__ITER}-VU${__VU}.png` });

  let BotaoProfessor = targetFrame.locator('//button[@id="rb_TpPrestador_Aluno_btn"]');
  await BotaoProfessor.click();
  await page.waitForTimeout(1000); 

  await page.screenshot({ path: `CAD_PRE/provfessor${__ITER}-VU${__VU}.png` });

  let InputChefe = targetFrame.locator('//input[@id="inp:cdPrestadorMuitos"]');
  await preencherInput(page, InputChefe, chefe);
  await InputChefe.press('Tab');
  //await conferePreenchimento(page, InputChefe, chefe)

  await page.screenshot({ path: `CAD_PRE/chefe${__ITER}-VU${__VU}.png` });

  let InputCcm = targetFrame.locator('//input[@id="inp:nrCcm"]');
  await preencherInput(page, InputCcm, Ccm);
  await InputCcm.press('Tab');
  //await conferePreenchimento(page, InputCcm, Ccm)  

  await page.screenshot({ path: `CAD_PRE/Ccm${__ITER}-VU${__VU}.png` });

  let InputEmail = targetFrame.locator('//input[@id="inp:dsEmail"]');
  await page.waitForTimeout(1000); 
  await preencherInput(page, InputEmail, Email+'@gmail.com');
  await InputEmail.press('Tab');
  //await conferePreenchimento(page, InputEmail, Email+'@gmail.com')  

  await page.screenshot({ path: `CAD_PRE/Email${__ITER}-VU${__VU}.png` });

  let InputConselho = targetFrame.locator('//input[@id="inp:dsCodigoConselho"]');
  await preencherInput(page, InputConselho, Conselho);
  await page.screenshot({ path: `CAD_PRE/ConselhoAntes${__ITER}-VU${__VU}.png` });
  await InputConselho.press('Tab');
  ////await conferePreenchimento(page, InputConselho, Conselho)  

  await page.screenshot({ path: `CAD_PRE/Conselho${__ITER}-VU${__VU}.png` });
  

}

//PREENCHER CONTATO

export async function cadastraContato(page, targetFrame, Contato, Email) {


  let AbaContato = targetFrame.locator('//li[@aria-controls="TAB_CANVAS-TAB_TIP_COMUN"]');
  await AbaContato.waitFor({ state: 'visible', timeout: 100000 });
  await AbaContato.click();
  await AbaContato.click();
  await page.waitForTimeout(1000); 

  await page.screenshot({ path: `CAD_PRE/abaContato${__ITER}-VU${__VU}.png` });


  let InputTela = targetFrame.locator('//div[@class="ui-buttoninput ui-widget ui-lovinput mode-edit"]/input[@type="text"]');
  await preencherInput(page, InputTela, Contato);
  await InputTela.press('Tab');
  //await conferePreenchimento(page, InputTela, tp_prestador)

  let DivContato = targetFrame.locator('//div[@class="ui-widget-content slick-row even active"]/div[@class="slick-cell b4 f4 selected ui-fixed-width"]');
  await DivContato.click();
  let InputContato = targetFrame.locator('//div[@class="slick-cell b4 f4 selected ui-fixed-width active editable"]/input[@class="editor-text mode-edit"]');
  await preencherInput(page, InputContato, Email+'@gmail.com');
  await InputContato.press('Tab');

  await page.screenshot({ path: `CAD_PRE/Contato${__ITER}-VU${__VU}.png` });

}

//PREENCHER VINCULO

export async function cadastraVinculo(page, targetFrame, Empresa) {


  let AbaVinculo = targetFrame.locator('//li[@aria-controls="TAB_CANVAS-TAB_TP_VINCULO"]');
  await AbaVinculo.waitFor({ state: 'visible', timeout: 100000 });
  await AbaVinculo.click();
  await AbaVinculo.click();
  await page.waitForTimeout(1000); 

  await page.screenshot({ path: `CAD_PRE/abaVinculo${__ITER}-VU${__VU}.png` });

  let InputTela = targetFrame.locator('//div[@class="ui-buttoninput ui-widget ui-lovinput mode-edit"]/input[@type="text"]');
  await preencherInput(page, InputTela, Empresa);
  await InputTela.press('Tab');
  //await conferePreenchimento(page, InputTela, tp_prestador)

  await page.screenshot({ path: `CAD_PRE/Vinculo${__ITER}-VU${__VU}.png` });


}

//PREENCHER ESPECIALIDADE

export async function cadastraEspecialidade(page, targetFrame, Especialidade, Carga) {

  let AbaEspec = targetFrame.locator('//li[@aria-controls="TAB_CANVAS-TAB_ESPECIALIDADES"]');
  await AbaEspec.waitFor({ state: 'visible', timeout: 100000 });
  await AbaEspec.click();
  await AbaEspec.click();
  await page.waitForTimeout(1000); 

  await page.screenshot({ path: `CAD_PRE/abaEspecialidade${__ITER}-VU${__VU}.png` });


  let InputTela = targetFrame.locator('//div[@class="ui-buttoninput ui-widget ui-lovinput mode-edit"]/input[@type="text"]');
  await preencherInput(page, InputTela, Especialidade);
  await InputTela.press('Tab');
  InputTela = targetFrame.locator('//div[@class="slick-cell b4 f4 selected active editable"]/input[@class="editor-text mode-edit"]');
  await preencherInput(page, InputTela, Carga);

  await page.screenshot({ path: `CAD_PRE/Vinculo${__ITER}-VU${__VU}.png` });

}

//PREENCHER AREA DE ATUACAO

export async function cadastraArea(page, targetFrame, Area) {

  let AbaArea = targetFrame.locator('//li[@aria-controls="TAB_CANVAS-TAB_AREA_ATUACAO"]');
  await AbaArea.waitFor({ state: 'visible', timeout: 100000 });
  await AbaArea.click();
  await AbaArea.click();
  await page.waitForTimeout(1000); 


  let InputTela = targetFrame.locator('//div[@class="ui-buttoninput ui-widget ui-lovinput mode-edit"]/input[@type="text"]');
  await preencherInput(page, InputTela, Area);
  await InputTela.press('Tab');

  await page.screenshot({ path: `CAD_PRE/AreaAtuacao${__ITER}-VU${__VU}.png` });

}

//PREENCHER DE CREDENCIAMENTO

export async function cadastraCredenciamento(page, targetFrame, Convenio) {

  let AbaCred = targetFrame.locator('//li[@aria-controls="TAB_CANVAS-TAB_CREDENCIAMENTO"]');
  await AbaCred.waitFor({ state: 'visible', timeout: 100000 });
  await AbaCred.click();
  await AbaCred.click();
  await page.waitForTimeout(1000); 


  let InputTela = targetFrame.locator('//div[@class="ui-buttoninput ui-widget ui-lovinput mode-edit"]/input[@type="text"]');
  await preencherInput(page, InputTela, Convenio);


  let DivConv = targetFrame.locator('//div[@class="slick-cell b12 f12 selected ui-fixed-width"]');
  await DivConv.click();
  await page.waitForTimeout(1000); 

  await page.screenshot({ path: `CAD_PRE/CredenAntes${__ITER}-VU${__VU}.png` });

  InputTela = targetFrame.locator('//div[@class="slick-cell b12 f12 selected ui-fixed-width active editable"]/input[@class="editor-text mode-edit"]');
  await preencherInput(page, InputTela, Convenio);
  await InputTela.press('Tab');

  await page.screenshot({ path: `CAD_PRE/Credenciamento${__ITER}-VU${__VU}.png` });

}

//GRUPOS PROIBIDOS

export async function gruposProibidos(page, targetFrame,) {

  let AbaGru = targetFrame.locator('//li[@aria-controls="TAB_CANVAS-TAB_GRU_PRO"]');
  await AbaGru.waitFor({ state: 'visible', timeout: 100000 });
  await AbaGru.click();
  await AbaGru.click();
  await page.waitForTimeout(1000); 

  let DivConv = targetFrame.locator('//div/button[@data-action="snProibido_change"][@data-row="0"]');
  await DivConv.click();
  await page.waitForTimeout(1000); 

  await page.screenshot({ path: `CAD_PRE/GruProib${__ITER}-VU${__VU}.png` });

}

//GRUPOS ORIGENS PROIBIDAS

export async function origensProibidas(page, targetFrame,) {

  let AbaOri = targetFrame.locator('//li[@aria-controls="TAB_CANVAS-TAB_ORI_PROIBIDO"]');
  await AbaOri.waitFor({ state: 'visible', timeout: 100000 });
  await AbaOri.click();
  await AbaOri.click();
  await page.waitForTimeout(1000); 

  let DivConv = targetFrame.locator('//div[@class="slick-cell b3 f3 slick-last-cell selected ui-fixed-width"]/div/button[@data-action="snProibido_change"][@data-row="0"]');
  await DivConv.click();
  await page.waitForTimeout(1000); 

  await page.screenshot({ path: `CAD_PRE/OriProib${__ITER}-VU${__VU}.png` });

}

//CADASTRAR PREFERENCIA

export async function cadPreferencia(page, targetFrame, Preferencia, Item) {

  let AbaOri = targetFrame.locator('//li[@aria-controls="TAB_CANVAS-TAB_PREFERENCIA"]');
  await AbaOri.waitFor({ state: 'visible', timeout: 100000 });
  await AbaOri.click();
  await AbaOri.click();
  await page.waitForTimeout(1000); 

  let InputTela = targetFrame.locator('//div[@class="ui-buttoninput ui-widget ui-lovinput mode-edit"]/input[@type="text"]');
  await preencherInput(page, InputTela, Preferencia);
  await InputTela.press('Tab');

  InputTela = targetFrame.locator('//div[@class="ui-buttoninput ui-widget ui-lovinput mode-edit"]/input[@class="ui-widget-content ui-buttoninput ui-corner-left"]');
  await preencherInput(page, InputTela, Item);
  await InputTela.press('Tab');

  await page.screenshot({ path: `CAD_PRE/Preferencia${__ITER}-VU${__VU}.png` });

}


//CADASTRAR REFERENCIA

export async function referencia(page, targetFrame, Instituicao, Contato) {


  let AbaOri = targetFrame.locator('//li[@aria-controls="TAB_CANVAS-TAB_REFERENCIA"]');
  await AbaOri.waitFor({ state: 'visible', timeout: 100000 });
  await AbaOri.click();
  await AbaOri.click();
  await page.waitForTimeout(1000); 

  let InputTela = targetFrame.locator('//div[@class="ui-buttoninput ui-widget ui-lovinput mode-edit"]/input[@type="text"]');
  await preencherInput(page, InputTela, Instituicao);
  await InputTela.press('Tab');

  InputTela = targetFrame.locator('//div[@class="slick-cell b2 f2 slick-last-cell selected ui-fixed-width active editable"]/input[@class="editor-text mode-edit"]');
  await preencherInput(page, InputTela, Contato);
  await InputTela.press('Tab');

  await page.screenshot({ path: `CAD_PRE/Referencia${__ITER}-VU${__VU}.png` });

}

//CADASTRAR INSTITUICAO

export async function cadInstituicao(page, targetFrame, Instituicao, Data, DataFim) {


  let AbaOri = targetFrame.locator('//li[@aria-controls="TAB_CANVAS-TAB_INSTITUICAO"]');
  await AbaOri.waitFor({ state: 'visible', timeout: 100000 });
  await AbaOri.click();
  await AbaOri.click();
  await page.waitForTimeout(1000); 

  let InputTela = targetFrame.locator('//div[@class="ui-buttoninput ui-widget ui-lovinput mode-edit"]/input[@type="text"]');
  await preencherInput(page, InputTela, Instituicao);
  await InputTela.press('Tab');

  InputTela = targetFrame.locator('//div[@class="ui-datefield ui-buttoninput ui-widget mode-edit"]/input[@class="ui-widget-content ui-buttoninput ui-corner-left"]');
  await preencherInput(page, InputTela, Data);
  await InputTela.press('Tab');
  await page.waitForTimeout(500); 
  await preencherInput(page, InputTela, DataFim);
  await InputTela.press('Tab');

  await page.screenshot({ path: `CAD_PRE/Instituicao${__ITER}-VU${__VU}.png` });

}

//CADASTRAR AGENDAMENTO

export async function cadAgenda(page, targetFrame, Sigla, Desc) {

  let AbaOri = targetFrame.locator('//li[@aria-controls="TAB_CANVAS-TAB_AGENDAMENTO"]');
  await AbaOri.waitFor({ state: 'visible', timeout: 100000 });
  await AbaOri.click();
  await AbaOri.click();
  await page.waitForTimeout(1000); 

  let InputTela = targetFrame.locator('//input[@id="inp:dsSiglaAgendamento"]');
  await preencherInput(page, InputTela, Sigla);
  await InputTela.press('Tab');

  InputTela = targetFrame.locator('//textarea[@id="inp:dsOrientacaoAgendamento"]');
  await preencherInput(page, InputTela, Desc);
  await InputTela.press('Tab');

  await page.screenshot({ path: `CAD_PRE/Agenda${__ITER}-VU${__VU}.png` });

}


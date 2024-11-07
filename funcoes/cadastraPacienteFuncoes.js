


const frameId = 'child_APOIO.HTML,ATEND.HTML,CONTR.HTML,DIAGN.HTML,EXTENSION.HTML,FATUR-CONV.HTML,FATUR-SUS.HTML,FINAN.HTML,GLOBAL.HTML,INTER.HTML,SUPRI.HTML'; 




//ACESSO A TELA CAD_PAC
export async function acessarCAD_PAC(page) {

  await page.screenshot({ path: `cadastrapaciente/loginIT${__ITER}-VU${__VU}.png` });

  const menuIcon = page.locator('//i[@class="mv-basico-menu dp32"]');
  await menuIcon.click();

  let AcessoTela = page.locator('//a[@title="Atendimento"]');
  await AcessoTela.click();
  AcessoTela = page.locator('//a[@title="Urgência e Emergência"]');
  await AcessoTela.click();
  AcessoTela = page.locator('//div[@class="menu-submenu menu-open"]/ul/li/a[@title="Atendimento"]');
  await AcessoTela.click();
  AcessoTela = page.locator('//a[@title="Cadastro Paciente"]');
  await AcessoTela.click();
  AcessoTela = page.locator('//input[@id="inp:nmPaciente"]');
  await AcessoTela.isVisible();
  await page.waitForTimeout(50000);

  await page.screenshot({ path: `cadastrapaciente/telaIT${__ITER}-VU${__VU}.png` });
}


//CADASTRAR PACIENTE NA CAD_PAC
export async function cadastraPaciente(page, targetFrame, nome, mae, nascimento, sexo, cor, cpf) {

  let InputTela;

  // Nome do paciente
  InputTela = await targetFrame.locator('//input[@id="inp:nmPaciente"]');
  await InputTela.click();  
  await InputTela.type(nome);  
  
  // Data de nascimento
  InputTela = await targetFrame.locator('//input[@id="inp:dtNascimento"]');
  await InputTela.click(); 
  await page.waitForTimeout(1000);
  await InputTela.type(nascimento);

  // Nome da mãe
  InputTela = await targetFrame.locator('//input[@id="inp:nmMae"]');
  await InputTela.click();  
  await page.waitForTimeout(1000);
  await InputTela.type(mae);
  
  // Sexo
  InputTela = await targetFrame.locator('//input[@id="tpSexo_ac"]');
  await InputTela.click();
  await page.waitForTimeout(9000);
  
  InputTela =await targetFrame.locator('//div[@data-member="TP_SEXO"]/button[@class="ui-button ui-widget ui-buttoninput ui-corner-right ui-button-icon"]');
  await InputTela.click();
  await page.screenshot({ path: `screenshots/sexoantes.png` });
  InputTela = await targetFrame.locator('//input[@id="tpSexo_ac"]');
  await InputTela.fill(sexo);
  await page.waitForTimeout(5000);

  //Cor
  InputTela = await targetFrame.locator('//input[@id="tpCor_ac"]')
  await InputTela.click();
  await page.waitForTimeout(9000);
  await InputTela.fill(cor);
  await page.waitForTimeout(5000);

  
  // CPF
  console.log('CPF gerado:', cpf); 
  await page.waitForTimeout(5000);
  InputTela = await targetFrame.locator('//input[@id="inp:nrCpf"]');
  await InputTela.click();
  await page.waitForTimeout(9000);
  await InputTela.type(cpf);

  
  await page.waitForTimeout(4000);

  await page.screenshot({ path: `cadastrapaciente/cadastroIT${__ITER}-VU${__VU}.png` });
}

//CADASTRAR ENDERECO NA CAD_PAC
export async function cadastraEndereco(page, targetFrame, rua, bairro, num, cidade) {

  let InputTela;

  //Endereco
  InputTela = await targetFrame.locator('//input[@id="inp:dsEndereco"]')
  await InputTela.click();
  await page.waitForTimeout(9000);
  await InputTela.fill(rua);
  await page.waitForTimeout(5000);  
  InputTela = await targetFrame.locator('//input[@id="inp:nmBairro"]')
  await InputTela.click();
  await page.waitForTimeout(9000);
  await InputTela.fill(bairro);
  await page.waitForTimeout(5000);  
  InputTela = await targetFrame.locator('//input[@id="inp:nrEndereco"]')
  await InputTela.click();
  await page.waitForTimeout(9000);
  await InputTela.fill(num);
  await page.waitForTimeout(5000);  
  InputTela = await targetFrame.locator('//input[@id="inp:cdCidade"]')
  await InputTela.click();
  await page.waitForTimeout(9000);
  await InputTela.fill(cidade);
  await page.waitForTimeout(5000);  

  await page.screenshot({ path: `cadastrapaciente/cadastroenderecoIT${__ITER}-VU${__VU}.png` });
  
}

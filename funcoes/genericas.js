import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';


//LOGIN
export async function login(page) {

  const user = page.locator('#AUTHENTICATION_SGUForm #username');
  const password = page.locator('#AUTHENTICATION_SGUForm #password');
  const companies = page.locator('#AUTHENTICATION_SGUForm #companies');
  const submit = page.locator('#AUTHENTICATION_SGUForm input[name="submit"]');

  await user.type('dbamv');
  await password.type('dbamv');
  await companies.selectOption('1');


  await page.waitForTimeout(4000);
  await submit.click();
  await page.waitForTimeout(10000);
}


//ACESSO A TELA ATEURG
export async function acessarATEURG(page) {
  const menuIcon = page.locator('//i[@class="mv-basico-menu dp32"]');
  await menuIcon.click();

  let AcessoTela = page.locator('//a[@title="Atendimento"]');
  await AcessoTela.click();
  AcessoTela = page.locator('//a[@title="Urgência e Emergência"]');
  await AcessoTela.click();
  AcessoTela = page.locator('//div[@class="menu-submenu menu-open"]/ul/li/a[@title="Atendimento"]');
  await AcessoTela.click();
  await page.waitForTimeout(4000);
  await AcessoTela.click();
  AcessoTela = page.locator('//div[@id="dspTpAtendimento"]');
  await AcessoTela.isVisible();
  await page.waitForTimeout(50000);
}


//ACESSO A TELA CAD_PAC
export async function acessarCAD_PAC(page) {
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

}



export function cleanName(name) {
  return name.replace(/[^\w\s]/g, '').trim();
}

export function nomeVariavel() {
  const rawName = faker.name.fullName(); // Gera um nome completo
  return cleanName(rawName); // Limpa o nome
}

const frameId = 'child_APOIO.HTML,ATEND.HTML,CONTR.HTML,DIAGN.HTML,EXTENSION.HTML,FATUR-CONV.HTML,FATUR-SUS.HTML,FINAN.HTML,GLOBAL.HTML,INTER.HTML,SUPRI.HTML'; 


export const options = {
  scenarios: {
    browser: {
      executor: 'per-vu-iterations',
      exec: 'browserTest',
      vus: 1,
      iterations: 1,
      options: {
        browser: {
          args: 'ignore-certificate-errors',
          type: 'chromium',
        },
      },
    },
  },
};

export function numeroaleatorio() {
  const numeroal = Math.floor(Math.random() * 1000);
  return numeroal;
}

export function gerarCPF() {
  const randomNumber = () => Math.floor(Math.random() * 9);
  let cpf = '';

  // Gera os 9 primeiros dígitos do CPF
  for (let i = 0; i < 9; i++) {
      cpf += randomNumber();
  }

  // Função para calcular o dígito verificador
  const calcularDigito = (cpf, fator) => {
      let total = 0;
      for (let i = 0; i < cpf.length; i++) {
          total += cpf[i] * fator--;
      }
      const resto = total % 11;
      return resto < 2 ? 0 : 11 - resto;
  };

  // Adiciona o primeiro dígito verificador
  cpf += calcularDigito(cpf, 10);

  // Adiciona o segundo dígito verificador
  cpf += calcularDigito(cpf, 11);

  // Retorna o CPF formatado
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1$2$3$4');
}



//CONSULTA PACIENTE ATRAVES DA ATEURG
export async function consultaPaciente(page, paciente, nomeMae) {
 
  const frames = await page.frames();
  const targetFrame = frames.find(frame => frame.name() === frameId || frame.url().includes("soul-product-workspace"));

  //let BtCadPac = targetFrame.locator('//button[@id="novopac"]');
  //await BtCadPac.click();
  await page.waitForTimeout(4000);
  let InputPac = targetFrame.locator('//input[@id="inp:primeiroNome"]')
  await InputPac.click();
  await InputPac.type(paciente); 

  let BtConsulta = targetFrame.locator('//button[@id="btnPesquisar"]')
  await BtConsulta.click();
  await page.waitForTimeout(4000);
  let NmMae = targetFrame.locator(`//div[@data-member="NM_MAE"][@title="${nomeMae}"]`);
  await NmMae.isVisible();

  
}

// SALVAR TELA E VALIDAR
export async function SalvarTela(page, msgesperada) {
  
  const frames = await page.frames();
  const targetFrame = frames.find(frame => frame.name() === frameId || frame.url().includes("soul-product-workspace"));

  const BtSalvar = targetFrame.locator('//li/a[@data-action="SAVE"]');
  await BtSalvar.click();
  await page.waitForTimeout(3000);

  const notificationElement = await targetFrame.locator('//div[@class="notifications-item-body notification-item-no-title"]/p');
  if (notificationElement) {
      const notificationText = await notificationElement.textContent();
      if (notificationText.includes(msgesperada)) {
          console.log('Mensagem de sucesso encontrada!');
      } else {
          console.log('Mensagem de sucesso não encontrada ou texto incorreto.');
      }
  } else {
      console.log('Elemento de notificação não encontrado.');
  }

}


//CADASTRAR PACIENTE NA CAD_PAC
export async function cadastraPaciente(page, nome, mae, nascimento, sexo, cor) {

  
  const frames = await page.frames();
  const targetFrame = frames.find(frame => frame.name() === frameId || frame.url().includes("soul-product-workspace"));
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

  //Endereco
  InputTela = await targetFrame.locator('//input[@id="inp:dsEndereco"]')
  await InputTela.click();
  await page.waitForTimeout(9000);
  await InputTela.fill('RUA DE TESTE');
  await page.waitForTimeout(5000);  
  InputTela = await targetFrame.locator('//input[@id="inp:nmBairro"]')
  await InputTela.click();
  await page.waitForTimeout(9000);
  await InputTela.fill('BAIRRO DE TESTE');
  await page.waitForTimeout(5000);  
  InputTela = await targetFrame.locator('//input[@id="inp:nrEndereco"]')
  await InputTela.click();
  await page.waitForTimeout(9000);
  await InputTela.fill('26');
  await page.waitForTimeout(5000);  
  InputTela = await targetFrame.locator('//input[@id="inp:cdCidade"]')
  await InputTela.click();
  await page.waitForTimeout(9000);
  await InputTela.fill('888');
  await page.waitForTimeout(5000);  
  
  // CPF
  const cpf = gerarCPF();
  console.log('CPF gerado:', cpf); 
  await page.waitForTimeout(5000);
  InputTela = await targetFrame.locator('//input[@id="inp:nrCpf"]');
  await InputTela.click();
  await page.waitForTimeout(9000);
  await InputTela.type(cpf);

  
  await page.waitForTimeout(4000);

  
}

//CADASTRAR ENDERECO NA CAD_PAC
export async function cadastraEndereco(page, rua, bairro, num, cidade) {
  
  const frames = await page.frames();
  const targetFrame = frames.find(frame => frame.name() === frameId || frame.url().includes("soul-product-workspace"));
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

  
}

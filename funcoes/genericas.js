import { browser } from 'k6/browser';
import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';

export const Url = {
  baseUrl: 'https://1801tst1.cloudmv.com.br/soul-mv/'
};



export const options = {
  scenarios: {
    browser: {
      executor: 'per-vu-iterations',
      exec: 'browserTest',
      vus: 6,
      iterations: 1,
      options: {
        browser: {
          args: ['ignore-certificate-errors', '--start-maximized'],
          type: 'chromium',
        },
      },
    },
  },
};

export async function PageConfs() {



const context = await browser.newContext({
  locale: 'pt-BR',
});
const page = await context.newPage({
  locale: 'pt-BR',
});
await page.setExtraHTTPHeaders({
  'Accept-Language': 'pt-BR',
});

return { browser, page };

}

export async function Iframe(page) {

const frameId = 'child_APOIO.HTML,ATEND.HTML,CONTR.HTML,DIAGN.HTML,EXTENSION.HTML,FATUR-CONV.HTML,FATUR-SUS.HTML,FINAN.HTML,GLOBAL.HTML,INTER.HTML,SUPRI.HTML'; 
const frames = await page.frames();
const targetFrame = frames.find(frame => frame.name() === frameId || frame.url().includes("soul-product-workspace"));

return { targetFrame };

}



//LOGIN
export async function login(page) {

  const user = page.locator('#AUTHENTICATION_SGUForm #username');
  const password = page.locator('#AUTHENTICATION_SGUForm #password');
  const companies = page.locator('#AUTHENTICATION_SGUForm #companies');
  const submit = page.locator('#AUTHENTICATION_SGUForm input[name="submit"]');

  await user.type('dbamv');
  await password.type('dbamv');
  await companies.selectOption('5');


  await page.waitForTimeout(4000);
  await submit.click();
  await page.waitForTimeout(10000);
}




export function cleanName(name) {
  return name.replace(/[^\w\s]/g, '').trim();
}

export function nomeVariavel() {
  const rawName = faker.name.fullName(); // Gera um nome completo
  return cleanName(rawName); // Limpa o nome
}

export function primeiroNomeVariavel() {
  const nomeCompleto = nomeVariavel();
  return nomeCompleto.split(' ')[0]; // Retorna apenas o primeiro nome
}





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

export function gerarRG() {
  const randomNumber = () => Math.floor(Math.random() * 9);
  let rg = '';

  for (let i = 0; i < 8; i++) {
      rg += randomNumber();
  }

  const calcularDigitoVerificador = (rg) => {
      let total = 0;
      let peso = 2;

      for (let i = rg.length - 1; i >= 0; i--) {
          total += rg[i] * peso;
          peso++;
      }

      const resto = total % 11;
      return resto < 2 ? 0 : 11 - resto;
  };

  rg += calcularDigitoVerificador(rg);

  return rg;
}



// SALVAR TELA E VALIDAR
export async function SalvarTela(page, targetFrame, msgesperada) {

  const BtSalvar = targetFrame.locator('//li/a[@data-action="SAVE"]');
  await BtSalvar.click();
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

export async function conferePreenchimento(page, locator, expectedValue, timeout = 60000) {
  const startTime = Date.now();
  while (Date.now() - startTime < timeout) {
      const value = await locator.inputValue();
      if (value === expectedValue) {
          return true;
      }
      await page.waitForTimeout(300);  // Espera breve antes de checar novamente
  }
  throw new Error(`Campo não foi preenchido com o valor esperado: ${expectedValue}`);
}

export async function preencherInput(page, locator, valor, timeout = 6000) {

  await locator.waitFor({ state: 'visible', timeout });
  await page.waitForTimeout(500);
  await locator.click();
  await page.waitForTimeout(500);
  await locator.type(valor);
  await page.waitForTimeout(1000);
}
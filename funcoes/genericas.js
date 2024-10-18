import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';

export const Url = {
  baseUrl: 'https://1801tst1.cloudmv.com.br/soul-mv/'
};

const frameId = 'child_APOIO.HTML,ATEND.HTML,CONTR.HTML,DIAGN.HTML,EXTENSION.HTML,FATUR-CONV.HTML,FATUR-SUS.HTML,FINAN.HTML,GLOBAL.HTML,INTER.HTML,SUPRI.HTML'; 


export const options = {
  scenarios: {
    browser: {
      executor: 'per-vu-iterations',
      exec: 'browserTest',
      vus: 2,
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

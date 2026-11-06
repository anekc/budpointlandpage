'use client'

import Link from 'next/link'
import { LegalPage, type LegalContent } from '../components/LegalPage'

const mail = <a href="mailto:support@budpoint.app">support@budpoint.app</a>

const content: Record<'en' | 'es', LegalContent> = {
  en: {
    label: 'Legal',
    title: 'Terms of Service',
    updated: 'Last updated: November 2026',
    sections: [
      {
        id: 'agreement',
        title: 'Agreement to Terms',
        body: (
          <p>
            By downloading, installing, or using the Budpoint application (“App”), you agree to be bound by these Terms of
            Service (“Terms”). If you disagree with any part of these Terms, you may not use the App.
          </p>
        ),
      },
      {
        id: 'service',
        title: 'Description of Service',
        body: (
          <p>
            Budpoint is a personal finance management application that allows users to track expenses, manage budgets,
            categorize transactions, and share financial information with other users. The App provides tools for financial
            planning and expense analysis.
          </p>
        ),
      },
      {
        id: 'accounts',
        title: 'User Accounts and Registration',
        body: (
          <ul>
            <li><strong>Account Creation:</strong> You must create an account using Sign in with Apple to access certain features.</li>
            <li><strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your account.</li>
            <li><strong>Accurate Information:</strong> You agree to provide accurate and complete information during registration.</li>
            <li><strong>Age Requirement:</strong> You must be at least 13 years old to use the App.</li>
          </ul>
        ),
      },
      {
        id: 'subscriptions',
        title: 'Subscription and Payment Terms',
        body: (
          <>
            <p>Budpoint offers the following subscription options:</p>
            <ul>
              <li><strong>Monthly Subscription — $4.99/month:</strong> Automatically renews every month. New subscribers get a 7-day free trial.</li>
              <li><strong>Annual Subscription — $39.99/year:</strong> Automatically renews every year. New subscribers get a 14-day free trial.</li>
              <li><strong>Lifetime Purchase — $79.99:</strong> One-time payment for permanent access. No free trial applies to this option.</li>
            </ul>
            <ul>
              <li><strong>Free Trial:</strong> If you start a subscription with a free trial, you won’t be charged until the trial ends. You can cancel anytime during the trial at no cost through your Apple ID account settings. If you don’t cancel before the trial ends, you will automatically be charged the subscription price shown above.</li>
              <li><strong>Auto-Renewal:</strong> Subscriptions automatically renew unless cancelled at least 24 hours before the end of the current period (or, if applicable, the free trial period).</li>
              <li><strong>Payment:</strong> Payment will be charged to your Apple ID account at confirmation of purchase, or at the end of the free trial if one applies.</li>
              <li><strong>Cancellation:</strong> You can manage and cancel subscriptions through your Apple ID account settings.</li>
              <li><strong>Refunds:</strong> Refunds are handled by Apple according to their refund policy.</li>
            </ul>
          </>
        ),
      },
      {
        id: 'responsibilities',
        title: 'User Responsibilities',
        body: (
          <>
            <p>You agree to:</p>
            <ul>
              <li>Use the App only for lawful purposes and in accordance with these Terms.</li>
              <li>Not attempt to gain unauthorized access to any part of the App.</li>
              <li>Not use the App to transmit viruses, malware, or other harmful code.</li>
              <li>Not reverse engineer, decompile, or disassemble the App.</li>
              <li>Not share your account credentials with others.</li>
              <li>Respect the privacy and rights of other users when sharing transactions.</li>
            </ul>
          </>
        ),
      },
      {
        id: 'data',
        title: 'Data and Privacy',
        body: (
          <ul>
            <li><strong>Your Data:</strong> You retain ownership of all financial data you enter into the App.</li>
            <li><strong>Data Storage:</strong> Your data is stored locally on your device and optionally synced via iCloud.</li>
            <li><strong>Sharing Features:</strong> When you share transactions with other users, that data is transmitted through our servers.</li>
            <li><strong>Privacy Policy:</strong> Our collection and use of information is governed by our <Link href="/privacy">Privacy Policy</Link>.</li>
          </ul>
        ),
      },
      {
        id: 'ip',
        title: 'Intellectual Property',
        body: (
          <p>
            The App and its original content, features, and functionality are owned by Budpoint and are protected by
            international copyright, trademark, patent, trade secret, and other intellectual property laws. You may not
            copy, modify, distribute, sell, or lease any part of the App.
          </p>
        ),
      },
      {
        id: 'liability',
        title: 'Limitation of Liability',
        body: (
          <p>
            In no event shall Budpoint be liable for any indirect, incidental, special, consequential, or punitive damages,
            including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from
            your use of the App.
          </p>
        ),
      },
      {
        id: 'availability',
        title: 'Service Availability',
        body: (
          <ul>
            <li><strong>Availability:</strong> We strive to maintain App availability but cannot guarantee uninterrupted service.</li>
            <li><strong>Maintenance:</strong> We may temporarily suspend the service for maintenance or updates.</li>
            <li><strong>Modifications:</strong> We reserve the right to modify or discontinue features at any time.</li>
          </ul>
        ),
      },
      {
        id: 'termination',
        title: 'Termination',
        body: (
          <p>
            We may terminate or suspend your account and access to the App immediately, without prior notice or liability,
            for any reason, including breach of these Terms. You may also terminate your account at any time by deleting it
            from the App’s settings, which removes your data from our servers as described in the Privacy Policy.
          </p>
        ),
      },
      {
        id: 'changes',
        title: 'Changes to Terms',
        body: (
          <p>
            We reserve the right to modify these Terms at any time. We will notify users of any material changes through an
            app update or notification. Your continued use of the App after changes constitutes acceptance of the new Terms.
          </p>
        ),
      },
      {
        id: 'law',
        title: 'Governing Law',
        body: (
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction where Budpoint is
            based, without regard to conflict of law provisions.
          </p>
        ),
      },
      {
        id: 'contact',
        title: 'Contact Information',
        body: (
          <p>
            If you have any questions about these Terms, please contact us through the support section in the App or by
            sending an email to {mail}.
          </p>
        ),
      },
    ],
  },
  es: {
    label: 'Legal',
    title: 'Términos de servicio',
    updated: 'Última actualización: noviembre de 2026',
    sections: [
      {
        id: 'agreement',
        title: 'Aceptación de los términos',
        body: (
          <p>
            Al descargar, instalar o usar la aplicación Budpoint (la “App”), aceptas estos Términos de servicio (los
            “Términos”). Si no estás de acuerdo con alguna parte, no debes usar la App.
          </p>
        ),
      },
      {
        id: 'service',
        title: 'Descripción del servicio',
        body: (
          <p>
            Budpoint es una aplicación de finanzas personales que te permite registrar gastos, administrar presupuestos,
            clasificar movimientos y compartir información financiera con otras personas. La App ofrece herramientas para
            planear tus finanzas y analizar tus gastos.
          </p>
        ),
      },
      {
        id: 'accounts',
        title: 'Cuentas de usuario y registro',
        body: (
          <ul>
            <li><strong>Creación de cuenta:</strong> Para usar algunas funciones necesitas crear una cuenta con Iniciar sesión con Apple.</li>
            <li><strong>Seguridad de la cuenta:</strong> Eres responsable de mantener la confidencialidad de tu cuenta.</li>
            <li><strong>Información correcta:</strong> Te comprometes a dar información completa y verdadera al registrarte.</li>
            <li><strong>Edad mínima:</strong> Debes tener al menos 13 años para usar la App.</li>
          </ul>
        ),
      },
      {
        id: 'subscriptions',
        title: 'Suscripciones y pagos',
        body: (
          <>
            <p>Budpoint ofrece estas opciones:</p>
            <ul>
              <li><strong>Suscripción mensual — $4.99 al mes:</strong> Se renueva cada mes. Si te suscribes por primera vez, tienes 7 días de prueba gratis.</li>
              <li><strong>Suscripción anual — $39.99 al año:</strong> Se renueva cada año. Si te suscribes por primera vez, tienes 14 días de prueba gratis.</li>
              <li><strong>Compra de por vida — $79.99:</strong> Un solo pago para tener acceso permanente. Esta opción no incluye prueba gratis.</li>
            </ul>
            <ul>
              <li><strong>Prueba gratis:</strong> Si empiezas una suscripción con prueba gratis, no se te cobra nada hasta que termine. Puedes cancelarla sin costo en cualquier momento durante la prueba desde los ajustes de tu Apple ID. Si no la cancelas antes de que termine, se te cobrará automáticamente el precio de la suscripción indicado arriba.</li>
              <li><strong>Renovación automática:</strong> Las suscripciones se renuevan solas, a menos que las canceles al menos 24 horas antes de que termine el periodo actual (o la prueba gratis, si aplica).</li>
              <li><strong>Pago:</strong> El cargo se hace a tu cuenta de Apple ID al confirmar la compra o, si tienes prueba gratis, cuando esta termina.</li>
              <li><strong>Cancelación:</strong> Puedes administrar y cancelar tus suscripciones desde los ajustes de tu Apple ID.</li>
              <li><strong>Reembolsos:</strong> Los reembolsos los gestiona Apple de acuerdo con su política.</li>
            </ul>
          </>
        ),
      },
      {
        id: 'responsibilities',
        title: 'Tus responsabilidades',
        body: (
          <>
            <p>Te comprometes a:</p>
            <ul>
              <li>Usar la App solo para fines legales y de acuerdo con estos Términos.</li>
              <li>No intentar acceder sin autorización a ninguna parte de la App.</li>
              <li>No usar la App para enviar virus, malware ni ningún otro código dañino.</li>
              <li>No aplicar ingeniería inversa, descompilar ni desensamblar la App.</li>
              <li>No compartir los datos de acceso de tu cuenta con nadie.</li>
              <li>Respetar la privacidad y los derechos de otras personas al compartir movimientos.</li>
            </ul>
          </>
        ),
      },
      {
        id: 'data',
        title: 'Datos y privacidad',
        body: (
          <ul>
            <li><strong>Tus datos:</strong> Toda la información financiera que registras en la App sigue siendo tuya.</li>
            <li><strong>Almacenamiento:</strong> Tus datos se guardan en tu dispositivo y, si lo activas, se sincronizan con iCloud.</li>
            <li><strong>Funciones para compartir:</strong> Cuando compartes movimientos con otras personas, esa información pasa por nuestros servidores.</li>
            <li><strong>Política de privacidad:</strong> La forma en que recopilamos y usamos tu información se rige por nuestra <Link href="/privacy">Política de privacidad</Link>.</li>
          </ul>
        ),
      },
      {
        id: 'ip',
        title: 'Propiedad intelectual',
        body: (
          <p>
            La App, su contenido original, sus funciones y su funcionamiento son propiedad de Budpoint y están protegidos por
            las leyes internacionales de derechos de autor, marcas, patentes, secretos comerciales y demás leyes de
            propiedad intelectual. No puedes copiar, modificar, distribuir, vender ni rentar ninguna parte de la App.
          </p>
        ),
      },
      {
        id: 'liability',
        title: 'Limitación de responsabilidad',
        body: (
          <p>
            En ningún caso Budpoint será responsable por daños indirectos, incidentales, especiales, consecuentes o
            punitivos, incluidos, entre otros, la pérdida de ganancias, datos, uso, reputación u otras pérdidas intangibles
            que resulten del uso de la App.
          </p>
        ),
      },
      {
        id: 'availability',
        title: 'Disponibilidad del servicio',
        body: (
          <ul>
            <li><strong>Disponibilidad:</strong> Hacemos lo posible por mantener la App disponible, pero no podemos garantizar un servicio sin interrupciones.</li>
            <li><strong>Mantenimiento:</strong> Podemos suspender el servicio temporalmente por mantenimiento o actualizaciones.</li>
            <li><strong>Cambios:</strong> Nos reservamos el derecho de modificar o retirar funciones en cualquier momento.</li>
          </ul>
        ),
      },
      {
        id: 'termination',
        title: 'Terminación',
        body: (
          <p>
            Podemos cancelar o suspender tu cuenta y tu acceso a la App de inmediato, sin previo aviso ni responsabilidad,
            por cualquier motivo, incluido el incumplimiento de estos Términos. Tú también puedes cancelar tu cuenta cuando
            quieras borrándola desde los ajustes de la App, lo que elimina tus datos de nuestros servidores como se describe
            en la Política de privacidad.
          </p>
        ),
      },
      {
        id: 'changes',
        title: 'Cambios a los términos',
        body: (
          <p>
            Podemos modificar estos Términos en cualquier momento. Si hay cambios importantes, te avisaremos con una
            actualización de la App o con una notificación. Si sigues usando la App después de los cambios, aceptas los
            nuevos Términos.
          </p>
        ),
      },
      {
        id: 'law',
        title: 'Legislación aplicable',
        body: (
          <p>
            Estos Términos se rigen e interpretan conforme a las leyes de la jurisdicción donde Budpoint tiene su sede, sin
            tomar en cuenta sus normas sobre conflictos de leyes.
          </p>
        ),
      },
      {
        id: 'contact',
        title: 'Contacto',
        body: (
          <p>
            Si tienes dudas sobre estos Términos, escríbenos desde la sección de soporte de la App o a {mail}.
          </p>
        ),
      },
    ],
  },
}

export default function TermsOfService() {
  return <LegalPage content={content} />
}

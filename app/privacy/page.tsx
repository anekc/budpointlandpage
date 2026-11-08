'use client'

import { LegalPage, type LegalContent } from '../components/LegalPage'

const mail = <a href="mailto:support@budpoint.app">support@budpoint.app</a>

const content: Record<'en' | 'es', LegalContent> = {
  en: {
    label: 'Legal',
    title: 'Privacy Policy',
    updated: 'Last updated: November 2026',
    intro: (
      <p>
        The short version: your finances live on your iPhone and in your own iCloud, encrypted. We only handle what’s needed
        to share expenses with other people and to confirm your Pro purchase. We don’t sell your data, we don’t show ads,
        and analytics are turned off.
      </p>
    ),
    sections: [
      {
        id: 'device',
        title: 'What stays on your iPhone',
        body: (
          <>
            <p>
              Your accounts, transactions, budgets, goals, tags, people and notes are stored on your device. We don’t have
              a copy of them.
            </p>
            <p>
              <strong>iCloud backup and sync (Pro, optional).</strong> If you turn it on, Budpoint saves your data in your
              private iCloud database. It’s end-to-end encrypted with a key kept in your iCloud Keychain, so neither we nor
              Apple can read it. That’s also how your data comes back when you set up a new iPhone.
            </p>
          </>
        ),
      },
      {
        id: 'capture',
        title: 'Apple Pay and bank email capture',
        body: (
          <>
            <p>
              If you set up the Apple Pay or bank email automations, they run in Apple’s Shortcuts app on your iPhone.
              Shortcuts hands Budpoint only the fields the automation sends (such as amount, merchant and card), and the
              purchase is saved on your device for you to confirm.
            </p>
            <p>Your emails and Wallet data never reach our servers. Budpoint never asks for your bank username or password.</p>
          </>
        ),
      },
      {
        id: 'servers',
        title: 'What goes through our servers',
        body: (
          <>
            <p>
              Only when you sign in to share expenses with other people, we use Google Firebase to store:
            </p>
            <ul>
              <li><strong>Your profile:</strong> the name and email that Sign in with Apple gives us (this can be a private relay address), and your Budpoint code (BUD-…).</li>
              <li><strong>A public profile</strong> with just your name and code, so your friends can find you.</li>
              <li><strong>Your connections</strong>: who you’ve connected with in Budpoint.</li>
              <li><strong>Shared expenses</strong>: amount, note, tag, date, whether it repeats, and its status (pending, accepted, paid or cancelled). Only you and the other person can see them.</li>
              <li><strong>A notification token</strong> plus your language and region, to send you push notifications about shared expenses.</li>
            </ul>
            <p>The rest of your finances is never sent to our servers.</p>
          </>
        ),
      },
      {
        id: 'purchases',
        title: 'Purchases',
        body: (
          <p>
            Subscriptions are processed by Apple through the App Store. We never see your card or
            payment details. To confirm that your Pro purchase is valid, the app sends us the transaction record that
            Apple signs.
          </p>
        ),
      },
      {
        id: 'faceid',
        title: 'Face ID',
        body: (
          <p>
            The Face ID or Touch ID lock is handled entirely by iOS. Budpoint only learns whether you were recognized; it
            never receives your biometric data.
          </p>
        ),
      },
      {
        id: 'not',
        title: 'What we don’t do',
        body: (
          <ul>
            <li>We don’t sell, rent or trade your information.</li>
            <li>We don’t show ads or track you across other apps and websites.</li>
            <li>Analytics and crash reporting are turned off in the app.</li>
            <li>We don’t connect to your bank.</li>
          </ul>
        ),
      },
      {
        id: 'third-parties',
        title: 'Services we use',
        body: (
          <>
            <ul>
              <li><strong>Apple:</strong> iCloud, Sign in with Apple, the App Store and Shortcuts.</li>
              <li><strong>Google Firebase:</strong> Authentication, Cloud Firestore, Cloud Functions and Cloud Messaging, only for the sharing features described above. These servers may be located outside your country, including the United States.</li>
              <li><strong>Formspree:</strong> stores the email you give us on this website to join the waitlist.</li>
              <li><strong>Vercel:</strong> hosts this website.</li>
            </ul>
            <p>Each of these services has its own privacy policy.</p>
          </>
        ),
      },
      {
        id: 'website',
        title: 'This website',
        body: (
          <p>
            If you join the waitlist, we keep your email only to tell you when Budpoint launches, and you can ask us to remove
            it at any time. The site remembers your theme and language in your browser. We don’t use tracking cookies.
          </p>
        ),
      },
      {
        id: 'deletion',
        title: 'Deleting your data',
        body: (
          <>
            <p>
              <strong>Deleting your account in the app</strong> permanently removes from our servers your profile, your
              code, your connections, every shared expense you sent or received, and your Pro verification. It also revokes
              Budpoint’s access to your Sign in with Apple account.
            </p>
            <p>
              Your data on your iPhone is deleted when you delete the app. You can remove your iCloud copy from your iPhone’s
              iCloud storage settings.
            </p>
          </>
        ),
      },
      {
        id: 'rights',
        title: 'Your rights',
        body: (
          <>
            <p>You can, at any time:</p>
            <ul>
              <li>See and correct your information in the app.</li>
              <li>Export your transactions to CSV or PDF.</li>
              <li>Disconnect from people and stop sharing expenses.</li>
              <li>Turn off notifications.</li>
              <li>Delete your account and your data.</li>
            </ul>
            <p>For anything else, including a copy of the data we hold about you, write to {mail}.</p>
          </>
        ),
      },
      {
        id: 'children',
        title: 'Children',
        body: (
          <p>
            Budpoint isn’t meant for children under 13, and we don’t knowingly collect their information. If we find out we
            have, we’ll delete it.
          </p>
        ),
      },
      {
        id: 'changes',
        title: 'Changes to this policy',
        body: (
          <p>
            If we make important changes, we’ll let you know in the app or with an update. The date at the top shows when
            this policy last changed.
          </p>
        ),
      },
      {
        id: 'contact',
        title: 'Contact',
        body: <p>Questions about your privacy? Write to {mail} or use the support section in the app.</p>,
      },
    ],
  },
  es: {
    label: 'Legal',
    title: 'Política de privacidad',
    updated: 'Última actualización: noviembre de 2026',
    intro: (
      <p>
        En pocas palabras: tus finanzas viven en tu iPhone y en tu propio iCloud, cifradas. Nosotros solo manejamos lo
        necesario para que compartas gastos con otras personas y para confirmar tu compra de Pro. No vendemos tus datos, no
        mostramos anuncios y la analítica está desactivada.
      </p>
    ),
    sections: [
      {
        id: 'device',
        title: 'Lo que se queda en tu iPhone',
        body: (
          <>
            <p>
              Tus cuentas, movimientos, presupuestos, metas, etiquetas, personas y notas se guardan en tu dispositivo.
              Nosotros no tenemos una copia.
            </p>
            <p>
              <strong>Respaldo y sincronización con iCloud (Pro, opcional).</strong> Si lo activas, Budpoint guarda tu
              información en tu base de datos privada de iCloud. Va cifrada de extremo a extremo con una llave que se queda
              en tu Llavero de iCloud, así que ni nosotros ni Apple podemos leerla. Así es también como recuperas todo
              cuando estrenas iPhone.
            </p>
          </>
        ),
      },
      {
        id: 'capture',
        title: 'Registro automático con Apple Pay y correos del banco',
        body: (
          <>
            <p>
              Si configuras las automatizaciones de Apple Pay o de los correos de tu banco, estas corren en la app Atajos de
              Apple, dentro de tu iPhone. Atajos le pasa a Budpoint solo los datos que envía la automatización (como el
              monto, el comercio y la tarjeta), y la compra se guarda en tu dispositivo para que la confirmes.
            </p>
            <p>Tus correos y los datos de tu Cartera nunca llegan a nuestros servidores. Budpoint nunca te pide el usuario ni la contraseña de tu banco.</p>
          </>
        ),
      },
      {
        id: 'servers',
        title: 'Lo que pasa por nuestros servidores',
        body: (
          <>
            <p>Solo si inicias sesión para compartir gastos con otras personas, usamos Google Firebase para guardar:</p>
            <ul>
              <li><strong>Tu perfil:</strong> el nombre y el correo que nos da Iniciar sesión con Apple (puede ser una dirección privada de reenvío) y tu código de Budpoint (BUD-…).</li>
              <li><strong>Un perfil público</strong> con solo tu nombre y tu código, para que tus amigos te encuentren.</li>
              <li><strong>Tus conexiones:</strong> con quién te has conectado en Budpoint.</li>
              <li><strong>Los gastos compartidos:</strong> monto, nota, etiqueta, fecha, si se repite y su estado (pendiente, aceptado, pagado o cancelado). Solo tú y la otra persona pueden verlos.</li>
              <li><strong>Un token de notificaciones</strong>, además de tu idioma y región, para avisarte de tus gastos compartidos.</li>
            </ul>
            <p>El resto de tus finanzas nunca se envía a nuestros servidores.</p>
          </>
        ),
      },
      {
        id: 'purchases',
        title: 'Compras',
        body: (
          <p>
            Las suscripciones las procesa Apple a través del App Store. Nunca vemos tu tarjeta ni tus
            datos de pago. Para confirmar que tu compra de Pro es válida, la app nos envía el comprobante de la transacción
            firmado por Apple.
          </p>
        ),
      },
      {
        id: 'faceid',
        title: 'Face ID',
        body: (
          <p>
            El bloqueo con Face ID o Touch ID lo maneja iOS por completo. Budpoint solo se entera de si te reconoció o no;
            nunca recibe tus datos biométricos.
          </p>
        ),
      },
      {
        id: 'not',
        title: 'Lo que no hacemos',
        body: (
          <ul>
            <li>No vendemos, rentamos ni intercambiamos tu información.</li>
            <li>No mostramos anuncios ni te rastreamos en otras apps o sitios web.</li>
            <li>La analítica y los reportes de fallos están desactivados en la app.</li>
            <li>No nos conectamos a tu banco.</li>
          </ul>
        ),
      },
      {
        id: 'third-parties',
        title: 'Servicios que usamos',
        body: (
          <>
            <ul>
              <li><strong>Apple:</strong> iCloud, Iniciar sesión con Apple, el App Store y Atajos.</li>
              <li><strong>Google Firebase:</strong> Authentication, Cloud Firestore, Cloud Functions y Cloud Messaging, solo para las funciones de compartir que describimos arriba. Estos servidores pueden estar fuera de tu país, incluso en Estados Unidos.</li>
              <li><strong>Formspree:</strong> guarda el correo que nos dejas en este sitio para la lista de espera.</li>
              <li><strong>Vercel:</strong> aloja este sitio web.</li>
            </ul>
            <p>Cada uno de estos servicios tiene su propia política de privacidad.</p>
          </>
        ),
      },
      {
        id: 'website',
        title: 'Este sitio web',
        body: (
          <p>
            Si te unes a la lista de espera, guardamos tu correo solo para avisarte cuando salga Budpoint, y puedes pedirnos
            que lo borremos cuando quieras. El sitio recuerda en tu navegador el tema y el idioma que elegiste. No usamos
            cookies de rastreo.
          </p>
        ),
      },
      {
        id: 'deletion',
        title: 'Cómo borrar tus datos',
        body: (
          <>
            <p>
              <strong>Si borras tu cuenta desde la app</strong>, eliminamos de nuestros servidores, de forma permanente, tu
              perfil, tu código, tus conexiones, todos los gastos compartidos que enviaste o recibiste y la verificación de
              tu compra de Pro. También se revoca el acceso de Budpoint a tu cuenta de Iniciar sesión con Apple.
            </p>
            <p>
              Lo que está en tu iPhone se borra al eliminar la app. La copia de iCloud la puedes quitar desde los ajustes de
              almacenamiento de iCloud en tu iPhone.
            </p>
          </>
        ),
      },
      {
        id: 'rights',
        title: 'Tus derechos',
        body: (
          <>
            <p>En cualquier momento puedes:</p>
            <ul>
              <li>Consultar y corregir tu información en la app.</li>
              <li>Exportar tus movimientos a CSV o PDF.</li>
              <li>Desconectarte de otras personas y dejar de compartir gastos.</li>
              <li>Desactivar las notificaciones.</li>
              <li>Borrar tu cuenta y tus datos.</li>
            </ul>
            <p>Para cualquier otra solicitud, como una copia de los datos que tenemos sobre ti, escríbenos a {mail}.</p>
          </>
        ),
      },
      {
        id: 'children',
        title: 'Menores de edad',
        body: (
          <p>
            Budpoint no está pensada para menores de 13 años y no recopilamos su información a sabiendas. Si nos damos cuenta
            de que lo hicimos, la borramos.
          </p>
        ),
      },
      {
        id: 'changes',
        title: 'Cambios a esta política',
        body: (
          <p>
            Si hacemos cambios importantes, te avisaremos en la app o con una actualización. La fecha de arriba indica
            cuándo se modificó por última vez.
          </p>
        ),
      },
      {
        id: 'contact',
        title: 'Contacto',
        body: <p>¿Tienes dudas sobre tu privacidad? Escríbenos a {mail} o usa la sección de soporte de la app.</p>,
      },
    ],
  },
}

export default function PrivacyPolicy() {
  return <LegalPage content={content} />
}

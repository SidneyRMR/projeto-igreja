

export default function Layout(props) {
    return (
        <div className={styles.layout}>
            <div className={styles.cabecalho}>
                <h1>{props.titulo ?? 'Mais um exemplo!'}</h1>
                <Link href='/'>Voltar</Link>
            </div>
            <div className={styles.conteudo}>
                {/* Este comando abaixo irá renderizar todo o conteudo das pages */}
                {props.children}
            </div>
        </div>
    )
}


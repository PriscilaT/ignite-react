export function RepositoryItem(props) {
    return (
        <li>
            <strong>{props.repository ?? 'default'}</strong>
            <p>Forms in React</p>

            <a href="">
                Acessar repositório
            </a>
        </li>
    )
}
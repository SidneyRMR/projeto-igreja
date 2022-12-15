// import diocese from "../img/diocese.png"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import Table from 'react-bootstrap/Table';

const AberturaCaixa = () => {



    return (
        <div className="bordaAbertura">
            <h1 className="title">Abertura de Caixa</h1>
            <Table>
                <tbody>
                    <tr>
                        <td>
                            Valor em caixa:
                        </td>
                        <td>
                            <input className='CaixaValorEntrada' type="text" placeholder='Digite o valor' /><br />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Nome do caixa responsável:
                        </td>
                        <td>
                            <input className='CaixaNome' type="text" placeholder='Digite o nome' /><br />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <a href="/vendas">Abrir caixa</a>
                        </td>
                        <td>
                            <a href="/">Sair</a>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <DropdownButton id="buttonAbertura" title="Administrativo" >
                                <Dropdown.Item href="/cadastros/produtos">Produtos</Dropdown.Item>
                                <Dropdown.Item href="/cadastros/usuarios">Usuários</Dropdown.Item>
                                <Dropdown.Item href="/fechamento-geral">Fech Geral</Dropdown.Item>
                            </DropdownButton >
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div >
    )
}

export default AberturaCaixa
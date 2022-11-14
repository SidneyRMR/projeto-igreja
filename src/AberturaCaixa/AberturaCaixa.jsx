// import diocese from "../img/diocese.png"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './AberturaCaixa.css'

import Table from 'react-bootstrap/Table';

const AberturaCaixa = () => {
    return (
        <Table className="bordaAbertura">


            <h1 className="titleAbertura">Abertura de Caixa</h1>
            <Table>
                <tbody>
                    <tr>
                        <td>
                            Valor em caixa:
                        </td>
                        <td>
                            <input type="text" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Selecione um caixa:
                        </td>
                        <td>
                            <select id="buttonAbertura" title="Caixas" align="end">
                                <option >Caixa 1</option>
                                <option >Caixa 2</option>
                                <option >Caixa 3</option>
                            </select >
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <a className="" href="/vendas">Abrir caixa</a>
                        </td>
                        <td>
                            <a className="" href="/">Sair</a>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <DropdownButton id="buttonAbertura" title="Administrativo" align="end">
                                <Dropdown.Item href="/cadastros/produtos">Produtos</Dropdown.Item>
                                <Dropdown.Item href="/cadastros/usuarios">Usuários</Dropdown.Item>
                                <Dropdown.Item href="/fechamento-geral">Fech Geral</Dropdown.Item>
                            </DropdownButton >
                        </td>
                    </tr>
                </tbody>
            </Table>

        </Table >
    )
}

export default AberturaCaixa
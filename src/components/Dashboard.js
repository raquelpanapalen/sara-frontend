import React, { useState } from "react"
import { useNavigate } from "react-router"
import Select from "react-select"
import homeLogo from "../images/home.png"
import cubierta2aguasImage from "../images/cubierta2aguas.png"
import paramVerticalesImage from "../images/paramverticales.png"
import CitySearch from "./CitySearch"
import { fetchToken } from "./Auth"
import { grados, tiposCubierta } from "./utils"
import axios from "axios"

export default function Dashboard() {
  const navigate = useNavigate()
  const [datos, setDatos] = useState(null)
  const [resultados, setResultados] = useState(null)

  const signOut = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const campos = [
      "municipio",
      "grado",
      "ancho",
      "largo",
      "alto",
      "tipoCubierta",
      "pendiente",
    ]
    const formData = new FormData()
    campos.forEach((campo) => {
      formData.append(campo, e.target[campo].value)
    })
    setDatos(campos.reduce((a, v) => ({ ...a, [v]: e.target[v].value }), {}))
    axios
      .post(`${process.env.REACT_APP_API_URL}/resultados`, formData, {
        headers: {
          Authorization: `Bearer ${fetchToken()}`,
        },
      })
      .then((response) => {
        const { F, G, H, I, J, ...obj1 } = response.data
        const obj2 = { F, G, H, I, J }
        setResultados([obj1, obj2])
      })
  }

  return (
    <>
      <nav className="nav">
        <img
          src={homeLogo}
          alt="Home logo"
          width={40}
          height={40}
          style={{ marginLeft: "10px" }}
        />
        <ul>
          <li>
            <a onClick={signOut}>
              <b>Log out</b>
            </a>
          </li>
        </ul>
      </nav>
      <div className="container-cards">
        <div className="block">
          <h1>Datos de la construcción</h1>
          <div className="card" style={{ width: "750px", height: "650px" }}>
            <form
              className="form"
              onSubmit={onSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                justifyContent: "space-around",
              }}
            >
              <div>
                <label>Municipio:</label>
                <CitySearch />
              </div>
              <div>
                <label>Grado de aspereza del entorno: </label>
                <Select
                  name="grado"
                  options={grados}
                  isClearable={true}
                  isSearchable={true}
                  required
                />
              </div>
              <div>
                <label>Dimensiones: </label>
                <table style={{ marginLeft: "20px" }}>
                  <tbody>
                    <tr>
                      <td>• Ancho: </td>
                      <td>
                        <input
                          type="number"
                          name="ancho"
                          min="0"
                          step=".01"
                          size={4}
                          style={{
                            marginRight: "5px",
                          }}
                          required
                        />
                        <label>m</label>
                      </td>
                    </tr>
                    <tr>
                      <td>• Largo: </td>
                      <td>
                        <input
                          type="number"
                          name="largo"
                          min="0"
                          step=".01"
                          size={4}
                          style={{
                            marginRight: "5px",
                          }}
                          required
                        />
                        <label>m</label>
                      </td>
                    </tr>
                    <tr>
                      <td>• Alto: </td>
                      <td>
                        <input
                          type="number"
                          name="alto"
                          min="0"
                          step=".01"
                          size={4}
                          style={{
                            marginRight: "5px",
                          }}
                          required
                        />
                        <label>m</label>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <label>Tipo de cubierta: </label>
                <span
                  style={{
                    marginLeft: "10px",
                    display: "inline-block",
                    width: "50%",
                  }}
                >
                  <Select
                    name="tipoCubierta"
                    options={tiposCubierta}
                    isClearable={true}
                    isSearchable={true}
                    required
                  />
                </span>
              </div>
              <div>
                <label>Pendiente de la cubierta: </label>
                <input
                  type="number"
                  name="pendiente"
                  step=".01"
                  size={4}
                  style={{
                    marginLeft: "10px",
                    marginRight: "5px",
                  }}
                  required
                />
                <label>grados</label>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button className="button" style={{ width: "150px" }}>
                  OBTENER RESULTADOS
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="block">
          <h1>Resultados</h1>
          <div className="card" style={{ width: "750px", height: "650px" }}>
            {resultados ? (
              <div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <table
                    className="tableresultados"
                    style={{ marginTop: "15px" }}
                  >
                    <tbody>
                      <tr>
                        {Object.keys(resultados[0]).map((key, i) => {
                          return (
                            <td key={i}>
                              <b>{key}</b>
                            </td>
                          )
                        })}
                      </tr>
                      <tr>
                        {Object.keys(resultados[0]).map((key, i) => {
                          return <td key={i}>{resultados[0][key]}</td>
                        })}
                      </tr>
                    </tbody>
                  </table>
                  <table
                    className="tableresultados"
                    style={{ marginTop: "15px", marginBottom: "30px" }}
                  >
                    <tbody>
                      <tr>
                        {Object.keys(resultados[1]).map((key) => {
                          return (
                            <td>
                              <b>{key}</b>
                            </td>
                          )
                        })}
                      </tr>
                      <tr>
                        {Object.keys(resultados[1]).map((key) => {
                          return <td>{resultados[1][key]}</td>
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  <img
                    src={paramVerticalesImage}
                    alt="Parametros verticales"
                    height={420}
                    style={{ marginLeft: "10px" }}
                  />
                  <img
                    src={cubierta2aguasImage}
                    alt="Cubierta a 2 aguas"
                    height={420}
                    style={{ marginLeft: "10px" }}
                  />
                </div>
              </div>
            ) : (
              <label>De momento no hay resultados disponibles.</label>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

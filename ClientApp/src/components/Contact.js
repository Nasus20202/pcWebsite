import React, { Component } from 'react';

export class Contact extends Component {
  static displayName = Contact.name;

  render() {
    return (
        [<div className="list-group computer-list list-group-item">
          <h1 className="d-flex justify-content-center" style={{margin: '20px'}}>Kontakt</h1>
            <div style={{fontSize: '1.3em', color: '#444'}}>
                Masz jakieś pytania dotyczące zestawów komputerowych? Żaden z nich nie jest dla Ciebie odpowiedni?
                Potrzebujesz pomocy z wyborem komponentów? Skontaktuj się ze mną poprzez email na adres <a className="fw-bold" style={{textDecoration: "none", color: "inherit"}} href="mailto:krzysztof.nasuta@wp.pl">krzysztof.nasuta@wp.pl</a>.
                <div className="mt-3">
                    Oferuję:
                    <ul>
                        <li>Pomoc w doborze komponentów i peryferiów</li>
                        <li>Wybór najbardziej opłacalnych podzespołów</li>
                        <li>Indywidualne dopasowanie zestawu</li>
                        <li>Złożenie jednoski komputerowej</li>
                    </ul>
                </div>
            </div>
        </div>,
      <div className="mt-3 list-group computer-list list-group-item">
          <div style={{fontSize: '1.1em'}}>
              W przypadku dodatkowych pytań zapraszam do kontaktu:<br/>
              Email • <a style={{textDecoration: "none", color: "inherit"}} href="mailto:krzysztof.nasuta@wp.pl">krzysztof.nasuta@wp.pl</a><br/>
              Discord • Nasus#8143<br/><br/>
              Więcej informacji o mnie dostępnych jest na stronie internetowej: <a target="_blank" className="fw-bold" style={{textDecoration: "none", color: "inherit"}} href="https://knasuta.me">knasuta.me</a>
          </div>
      </div>]
    );
  }
}

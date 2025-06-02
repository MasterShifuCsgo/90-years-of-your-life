import {LIFE_STAGES} from "../../Context.jsx";


function Legend(){

  return (
        <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #eee', borderRadius: '8px', backgroundColor: '#f9f9f9', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: '0', marginBottom: '10px', color: '#333' }}>Eluetappide legend</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            {LIFE_STAGES.map((stage) => (
              <div key={stage.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: stage.color,
                    border: '1px solid #ccc',
                    boxShadow: 'inset 0 0 3px rgba(0,0,0,0.2)'
                  }}
                ></div>
                <span style={{ fontSize: '0.9em', color: '#555' }}>{stage.label}</span>
              </div>
            ))}
          </div>

          
        </div>

  )
}

export default Legend;



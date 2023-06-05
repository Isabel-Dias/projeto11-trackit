
export default function Weekdays(props) {
    const {habit} = props;
    return (
        <>
            <button type="button" style={!habit.days.includes(0) ? {
                color: '#DBDBDB',
                backgroundColor: '#FFFFFF'
            } : { color: '#FFFFFF', backgroundColor: '#CFCFCF' }}>
                D
            </button>
            <button type="button" style={!habit.days.includes(1) ? {
                color: '#DBDBDB',
                backgroundColor: '#FFFFFF'
            } : { color: '#FFFFFF', backgroundColor: '#CFCFCF' }}>
                S
            </button>
            <button type="button" style={!habit.days.includes(2) ? {
                color: '#DBDBDB',
                backgroundColor: '#FFFFFF'
            } : { color: '#FFFFFF', backgroundColor: '#CFCFCF' }}>
                T
            </button>
            <button type="button" style={!habit.days.includes(3) ? {
                color: '#DBDBDB',
                backgroundColor: '#FFFFFF'
            } : { color: '#FFFFFF', backgroundColor: '#CFCFCF' }}>
                Q
            </button>
            <button type="button" style={!habit.days.includes(4) ? {
                color: '#DBDBDB',
                backgroundColor: '#FFFFFF'
            } : { color: '#FFFFFF', backgroundColor: '#CFCFCF' }}>
                Q
            </button>
            <button type="button" style={!habit.days.includes(5) ? {
                color: '#DBDBDB',
                backgroundColor: '#FFFFFF'
            } : { color: '#FFFFFF', backgroundColor: '#CFCFCF' }}>
                S
            </button>
            <button type="button" style={!habit.days.includes(6) ? {
                color: '#DBDBDB',
                backgroundColor: '#FFFFFF'
            } : { color: '#FFFFFF', backgroundColor: '#CFCFCF' }}>
                S
            </button>
        </>
    )
}

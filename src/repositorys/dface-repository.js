import SqlHelper from '../utils/sql-helper';

const sql = new SqlHelper('w-mn.tobit.ag\\kmathmann', 'cwl-dface');

export const getConfig = async(uid) => {
    const rows = await  sql.execQueryWithParams(`SELECT TOP 1
                        uid,
                        locationId,
                        tappId
                   FROM config WITH (NOLOCK)
                   WHERE uid = ?`, [uid]);

    return rows.length > 0 ? rows[0] : null;
};

export const setTappId = async(uid, tappId) => {
    try {
        await  sql.execQueryWithParams(`UPDATE config
                                        SET tappId = ?,
                                            updateTime = GETDATE()
                                        WHERE uid = ?`, [tappId, uid]);
    } catch (e) {
        console.error(e);
        return false;
    }
    return true;
};
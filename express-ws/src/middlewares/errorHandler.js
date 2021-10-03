export function errorHandler(err, req, res, _) {
	if (err) {
		return res.json({error: 'No api route to '+ req.originalUrl})
	}
	else return res.json({error: '' })
}

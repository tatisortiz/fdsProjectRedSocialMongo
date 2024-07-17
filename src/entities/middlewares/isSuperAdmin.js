
export const isSuperAdmin = async (req, res,next) => {
    try {
     
        if (req.tokenData.role !== 'super_admin') {
           return res.json(
                {
                    success: false,
                    message: 'you are not allowed'
                }
            )
        }

        next()

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'ERROR',
            error: error.message
        })
    }
}
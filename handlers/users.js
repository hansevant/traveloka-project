import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const index = async (req, res) => {
    const users = await prisma.user.findMany();
    
    return res.json({
        status: 'success',
        message: null,
        data: users
    });
}

const store = async (req, res) => {
    return res.json({
        status: 'success',
        message: 'Post routes'
    })
}

const show = async (req, res) => {
    const id = req.params.id;

    if(!id || !Number.isInteger(parseInt(id))) { 
        return res.status(400).json({
            status: 'error',
            message: 'Invalid id parameter'
        })
    }

    return res.json({
        status: 'success',
        message: `Show Route id: ${id}`
    });
}

const update = async (req, res) => {
    const id = req.params.id;

    if(!id || !Number.isInteger(parseInt(id))) { 
        return res.status(400).json({
            status: 'error',
            message: 'Invalid id parameter'
        })
    }

    return res.json({
        status: 'success',
        message: `Update Route id: ${id}`
    });
}

const destroy = async (req, res) => {
    const id = req.params.id;

    if(!id || !Number.isInteger(parseInt(id))) { 
        return res.status(400).json({
            status: 'error',
            message: 'Invalid id parameter'
        })
    }

    const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
    })

    if(!user) { 
        return res.status(404).json({
            status: 'error',
            message: 'User not found'
        })
    }

    await prisma.user.delete({
        where: { id: 1 },
    })

    return res.json({
        status: 'success',
        message: `user deleted`
    });
}

export { index, show, update, destroy, store };
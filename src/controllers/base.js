const createControllers = (Model) => {
  const list = async (req, res, next) => {
    const data = await Model.find()
    res.data = data

    next()
  }

  const queryset = async ({ query, sort, limit, select }) => {
    const data = Model.find(query).sort(sort).limit(limit).select(select)
    // console.log(data, typeof data)
    return data
  }

  const single = async (req, res, next) => {
    const { id } = req.params
    const doc = await Model.findById({ _id: id })

    doc.views += 1
    doc.save()

    res.data = doc
    next()
  }

  const create = async (req, res, next) => {
    const data = new Model(req.body)
    await data.save()

    res.data = data
    next()
  }

  const update = async (req, res, next) => {
    const { fields, ...set } = req.body
    const doc = await Model.findOneAndUpdate(fields, { $set: set })

    res.data = doc
    next()
  }

  const deleteItem = async (req, res, next) => {
    const resp = await Model.findByIdAndDelete(req.params.id)
    console.log(resp)

    res.data = resp
    next()
  }

  return {
    list,
    single,
    create,
    update,
    deleteItem,
    queryset,
  }
}

export default createControllers

import { Router } from 'express'
import * as bookCtrl from '../controllers/books.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', bookCtrl.index)
router.get('/:bookId', bookCtrl.show)
router.get('/:bookId/edit', isLoggedIn, bookCtrl.edit)

router.post('/', isLoggedIn, bookCtrl.create)

router.patch('/:bookId/flip-read', isLoggedIn, bookCtrl.flipRead)

router.put('/:bookId', isLoggedIn, bookCtrl.update)

router.delete('/:bookId', isLoggedIn, bookCtrl.delete)

export {
  router
}
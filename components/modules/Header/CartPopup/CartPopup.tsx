import { useUnit } from 'effector-react'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { forwardRef } from 'react'
import { getCartItemsFx } from '@/api/cart'
import { withClickOutside } from '@/components/hocs/withClickOutside'
import { useLang } from '@/hooks/useLang'
import { IWrappedComponentProps } from '@/types/hocs'
import CartPopupItem from './CartPopupItem'
import { useTotalPrice } from '@/hooks/useTotalPrice'
import { formatPrice } from '@/lib/utils/common'
import { $cart, $cartFromLs } from '@/context/cart'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'

const CartPopup = forwardRef<HTMLDivElement, IWrappedComponentProps>(
  ({ open, setOpen }, ref) => {
    const { lang, translations } = useLang()
    const handleShowPopup = () => setOpen(true) // Функция для открытия всплывающего окна
    const spinner = useUnit(getCartItemsFx.pending) // Хук для отображения спиннера во время загрузки
    const currentCartByAuth = useGoodsByAuth($cart, $cartFromLs) // Хук для получения текущей корзины пользователя
    const { animatedPrice } = useTotalPrice() // Хук для получения общей суммы покупок

    const handleHidePopup = () => setOpen(false) // Функция для закрытия всплывающего окна

    return (
      <div className='cart-popup' ref={ref}>
        <Link
          className='header__links__item__btn header__links__item__btn--cart'
          href='/cart'
          onMouseEnter={handleShowPopup}  // При наведении мыши на кнопку открытия окна корзины вызывается функция handleShowPopup
        >
          {!!currentCartByAuth.length && <span className='not-empty' />} // Если в корзине есть товары, отображается метка о наличии товаров
        </Link>
        <AnimatePresence>
        // Если состояние open равно true, отображается всплывающее окно
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className='cart-popup__wrapper'
              onMouseLeave={handleHidePopup} // При уводе мыши с всплывающего окна вызывается функция handleHidePopup для его закрытия
            >
              <span className='cart-popup__arrow' />
              <button
                className='btn-reset cart-popup__close'
                onClick={handleHidePopup}
              />
              <h3 className='cart-popup__title'>
                {translations[lang].breadcrumbs.cart}
              </h3>
              {spinner ? (
                <div className='cart-popup__spinner'>
                  <FontAwesomeIcon
                    icon={faSpinner}
                    spin
                    color='#fff'
                    size='3x'
                  />
                </div>
              ) : (
                <ul className='list-reset cart-popup__cart-list'>
                  <AnimatePresence>
                    {currentCartByAuth.length ? (
                      currentCartByAuth.map((item) => (
                        <motion.li
                          key={item._id || item.clientId}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className='cart-list__item'
                        >
                          <CartPopupItem item={item} />
                        </motion.li>
                      ))
                    ) : (
                      <li className='cart-popup__cart-list__empty-cart' />
                    )}
                  </AnimatePresence>
                </ul>
              )}
              <div className='cart-popup__footer'>
                <div className='cart-popup__footer__inner'>
                  <span>{translations[lang].common.order_price}:</span>
                  <span>{formatPrice(animatedPrice)} PLN</span>
                </div>
                <Link href='/order' className='cart-popup__footer__link'>
                  {translations[lang].breadcrumbs.order}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

CartPopup.displayName = 'CartPopup'

export default withClickOutside(CartPopup)

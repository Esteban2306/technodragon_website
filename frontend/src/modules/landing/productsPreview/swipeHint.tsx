'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Pointer } from 'lucide-react';

type Props = {
  visible: boolean;
};

export default function SwipeHint({ visible }: Props) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="flex justify-center items-center mt-6 md:hidden"
        >
          <motion.div
            animate={{ x: [-15, 15, -15] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="flex items-center gap-2 text-gray-400"
          >
            <Pointer className="w-5 h-5 text-red-500" />
            <span className="text-sm">Desliza para ver más</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
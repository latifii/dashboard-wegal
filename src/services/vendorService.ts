import type { PurchaseParams } from 'src/types/vendor.interface';

import http from 'src/configs/axios';

export async function purchaseApi({ warrantyCode, userPhoneNumber }: PurchaseParams): Promise<any> {
  try {
    const response = await http.post(
      `/Vendor/purchase?warrantyCode=${warrantyCode}&userPhoneNumber=${userPhoneNumber}`
    );
    return response.data;
  } catch (error) {
    console.error('Error during purchase API call:', error);
    throw new Error('Purchase request failed');
  }
}

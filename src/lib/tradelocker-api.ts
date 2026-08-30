// TradeLocker API Client
// Handles authentication and API communication with TradeLocker

const TRADELOCKER_BASE_URL = {
  demo: 'https://demo.tradelocker.com/backend-api',
  live: 'https://live.tradelocker.com/backend-api',
}

export interface TradeLockerCredentials {
  email: string
  password: string
  server: string
  account: number
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export interface TradeLockerClient {
  authenticate(credentials: TradeLockerCredentials): Promise<AuthResponse>
  getQuotes(instruments: string[]): Promise<any>
  placeOrder(orderData: any): Promise<any>
  getPositions(): Promise<any>
  getOrders(): Promise<any>
  closeOrder(orderId: string): Promise<any>
}

class TradeLockerAPI implements TradeLockerClient {
  private baseUrl: string
  private accessToken: string | null = null
  private refreshToken: string | null = null

  constructor(server: string) {
    this.baseUrl = server === 'CRUC' ? TRADELOCKER_BASE_URL.live : TRADELOCKER_BASE_URL.demo
  }

  async authenticate(credentials: TradeLockerCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/jwt/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
          server: credentials.server,
        }),
      })

      if (!response.ok) {
        throw new Error(`Authentication failed: ${response.statusText}`)
      }

      const data = await response.json()
      
      this.accessToken = data.accessToken
      this.refreshToken = data.refreshToken

      return {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        expiresIn: data.expiresIn,
      }
    } catch (error) {
      console.error('Authentication error:', error)
      throw error
    }
  }

  private async getAuthenticatedHeaders() {
    if (!this.accessToken) {
      throw new Error('Not authenticated. Call authenticate() first.')
    }

    return {
      'Authorization': `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json',
    }
  }

  async getQuotes(instruments: string[]): Promise<any> {
    const headers = await this.getAuthenticatedHeaders()
    
    try {
      const response = await fetch(`${this.baseUrl}/trade/quotes`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ instruments }),
      })

      if (!response.ok) {
        throw new Error(`Failed to get quotes: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Quotes error:', error)
      throw error
    }
  }

  async placeOrder(orderData: any): Promise<any> {
    const headers = await this.getAuthenticatedHeaders()
    
    try {
      const response = await fetch(
        `${this.baseUrl}/trade/accounts/${orderData.accountId}/orders`,
        {
          method: 'POST',
          headers: {
            ...headers,
            'accNum': orderData.accountNumber.toString(),
          },
          body: JSON.stringify({
            qty: orderData.qty,
            routeId: orderData.routeId,
            side: orderData.side,
            validity: orderData.validity,
            type: orderData.type,
            tradableInstrumentId: orderData.tradableInstrumentId,
            price: orderData.price || 0,
            stopPrice: orderData.stopPrice,
            takeProfit: orderData.takeProfit,
            stopLoss: orderData.stopLoss,
          }),
        }
      )

      if (!response.ok) {
        throw new Error(`Failed to place order: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Order placement error:', error)
      throw error
    }
  }

  async getPositions(): Promise<any> {
    const headers = await this.getAuthenticatedHeaders()
    
    try {
      const response = await fetch(`${this.baseUrl}/trade/accounts/positions`, {
        method: 'GET',
        headers,
      })

      if (!response.ok) {
        throw new Error(`Failed to get positions: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Positions error:', error)
      throw error
    }
  }

  async getOrders(): Promise<any> {
    const headers = await this.getAuthenticatedHeaders()
    
    try {
      const response = await fetch(`${this.baseUrl}/trade/accounts/orders`, {
        method: 'GET',
        headers,
      })

      if (!response.ok) {
        throw new Error(`Failed to get orders: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Orders error:', error)
      throw error
    }
  }

  async closeOrder(orderId: string): Promise<any> {
    const headers = await this.getAuthenticatedHeaders()
    
    try {
      const response = await fetch(`${this.baseUrl}/trade/orders/${orderId}`, {
        method: 'DELETE',
        headers,
      })

      if (!response.ok) {
        throw new Error(`Failed to close order: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Close order error:', error)
      throw error
    }
  }
}

export function createTradeLockerClient(server: string): TradeLockerClient {
  return new TradeLockerAPI(server)
}
